import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";

import { auth } from "@/services/firebase";
import { stripePromise } from "@/services/stripe";

import {
  changePassword,
  getAuthAccount,
  reauthenticateWithCredentials,
  signInWithCredentials,
  signOut,
  signUpWithCredentials,
  updateAuthAccount,
} from "@/services/api/auth";
import { getServices } from "@/services/api/services";
import { createServiceTransaction } from "@/services/api/transaction";

function Input({ type = "text", name, label }) {
  return (
    <div className="flex flex-col gap-0.5">
      <label htmlFor={name}>{label}</label>
      <input className="bg-white" type={type} id={name} name={name} />
    </div>
  );
}

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: "https://example.com/order/123/complete",
      },
    });

    if (result.error) {
      // Show error to customer (for example, payment details incomplete)
      console.log(result.error.message);
    } else {
      // Customer will be redirected to `return_url`
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button disabled={!stripe}>Submit</button>
    </form>
  );
}

export default function Home() {
  const [user, setUser] = useState(() => auth.currentUser);
  const [services, setServices] = useState(null);
  const [secret, setSecret] = useState(null);

  useEffect(() => {
    (async () => {
      const { data, error } = await getServices();
      if (error) return console.log(error);

      setServices(data);
    })();
  }, []);

  useEffect(() => {
    return auth.onAuthStateChanged(async (val) => {
      if (!val) return setUser(null);

      const { data, error } = await getAuthAccount();
      if (error) return console.log(error);

      setUser(data);
    });
  }, [setUser]);

  async function handleSignup(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const dto = Object.fromEntries(formData);

    const { error } = await signUpWithCredentials(dto);
    if (error) return console.log(error);
  }

  async function handleSignin(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const dto = Object.fromEntries(formData);

    const { error } = await signInWithCredentials(dto.email, dto.password);
    if (error) return console.log(error);
  }

  async function handleSignout() {
    await signOut();
  }

  async function handleUpdate(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const dto = Object.fromEntries(formData);

    const { error: reauthError } = await reauthenticateWithCredentials(
      dto.password
    );
    if (reauthError) return console.log(reauthError);

    const { data, error: updateError } = await updateAuthAccount(dto);
    if (updateError) return console.log(updateError);

    setUser(data);
  }

  async function handleChangePass(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const dto = Object.fromEntries(formData);

    const { error: reauthError } = await reauthenticateWithCredentials(
      dto.oldPassword
    );
    if (reauthError) return console.log(reauthError);

    const { error: updateError } = await changePassword(dto.password);
    if (updateError) return console.log(updateError);
  }

  async function handleCreatePaymentIntent() {
    const { data, error } = await createServiceTransaction([
      {
        service: "Fyjo40eHZuctzGvirSq5",
      },
      {
        service: "IyR5j68ooLItfHOv9xqj",
        inclusions: [9, 9, 9, 8],
        quantity: 2,
      },
    ]);
    if (error) return console.log(error);

    setSecret(data.secret);
  }

  return (
    <div className="pb-8">
      <pre>{user ? JSON.stringify(user) : "{ user: null }"}</pre>
      {services ? (
        <ul>
          {services.map(({ id, ...data }) => (
            <div className="mt-8" key={id}>
              <h1>{id}</h1>
              {JSON.stringify(data)}
            </div>
          ))}
        </ul>
      ) : null}

      <form
        onSubmit={handleSignup}
        className="flex flex-col gap-1 max-w-screen-sm bg-slate-400 p-6 m-auto rounded-lg"
      >
        <Input name="firstName" label="First Name" />
        <Input name="lastName" label="Last Name" />
        <Input name="phone" label="Phone" />
        <Input type="email" name="email" label="Email" />
        <Input type="password" name="password" label="Password" />

        <button type="submit">Register</button>
      </form>
      <hr />
      <form
        onSubmit={handleUpdate}
        className="flex flex-col gap-1 max-w-screen-sm bg-slate-400 p-6 m-auto rounded-lg"
      >
        <Input name="phone" label="Phone" />
        <Input type="email" name="email" label="Email" />
        <Input type="password" name="password" label="Password" />

        <button type="submit">Update</button>
      </form>
      <hr />
      <form
        onSubmit={handleChangePass}
        className="flex flex-col gap-1 max-w-screen-sm bg-slate-400 p-6 m-auto rounded-lg"
      >
        <Input type="text" name="oldPassword" label="Old Password" />
        <Input type="text" name="password" label="Password" />

        <button type="submit">Change Password</button>
      </form>
      <hr />
      <form
        onSubmit={handleSignin}
        className="flex flex-col gap-1 max-w-screen-sm bg-slate-400 p-6 m-auto rounded-lg"
      >
        <Input type="email" name="email" label="Email" />
        <Input type="password" name="password" label="Password" />

        <button type="submit">Signin</button>
      </form>
      {secret ? (
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret: secret,
          }}
        >
          <CheckoutForm />
        </Elements>
      ) : null}

      <hr />
      <button onClick={handleCreatePaymentIntent}>Create Payment Intent</button>
      <br />
      <button onClick={handleSignout}>Signout</button>
    </div>
  );
}
