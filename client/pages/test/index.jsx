import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useEffect, useId, useState } from "react";

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
import { sendContactEmail } from "@/services/api/contact";
import { getServices } from "@/services/api/services";
import { createServiceTransaction } from "@/services/api/transaction";

function Input({ type = "text", name, label }) {
  const id = useId();

  return (
    <div className="flex flex-col gap-0.5">
      <label
        className="uppercase text-xs font-semibold text-gray-800 dark:text-white"
        htmlFor={name + id}
      >
        {label}
      </label>
      <input
        className="w-full bg-transparent text-white rounded-md border border-white px-3 py-2 text-sm placeholder-gray-600 invalid:border-red-500 dark:placeholder-gray-300"
        type={type}
        id={name + id}
        name={name}
      />
    </div>
  );
}

function Button({ className, children, ...props }) {
  return (
    <button
      {...props}
      className="hover:shadow-lg active:shadow-lg transition-shadow shadow uppercase px-4 py-2 bg-gradient-to-bl from-[#00C1EB] to-[#008fb0] text-white rounded-2xl w-full text-center"
    >
      {children}
    </button>
  );
}

function Form({ children, onSubmit, title, buttonLabel = "Submit" }) {
  return (
    <div className="rounded-[calc(1.5rem-1px)] bg-neutral-700 p-8 w-96 flex flex-col">
      <h3 className="text-xl font-semibold text-white mb-4">{title}</h3>
      <form onSubmit={onSubmit} className="basis-full flex flex-col gap-2">
        {children}

        <div className="basis-full flex items-end gap-2">
          <Button type="submit">{buttonLabel}</Button>{" "}
          <Button type="reset">Clear</Button>
        </div>
      </form>
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
    <form
      onSubmit={handleSubmit}
      className="w-[512px] m-auto flex flex-col my-4 gap-4"
    >
      <PaymentElement />
      <Button disabled={!stripe}>Submit</Button>
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
    if (!services) return;

    const { data, error } = await createServiceTransaction(
      services.map(({ id, inclusions }) => ({
        service: id,
        inclusions: inclusions.map(({ id }) => id),
      }))
    );
    if (error) return console.log(error);

    setSecret(data.secret);
  }

  async function handleContact(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const dto = Object.fromEntries(formData);

    const { error } = await sendContactEmail(dto);
    if (error) return console.log(error);
  }

  return (
    <div className="flex w-full">
      <div className="basis-1/4 max-h-[80vh] overflow-y-scroll">
        <h2 className="text-xl font-bold">User</h2>
        <pre>{user ? JSON.stringify(user, null, 2) : "{ user: null }"}</pre>
        {services ? (
          <div>
            <h2 className="text-xl font-bold">Services</h2>
            {services.map(({ id, ...data }) => (
              <div key={id} className="mb-4">
                <h3 className="text-base font-bold">{data.title}</h3>
                <pre key={id}>{JSON.stringify({ id, ...data }, null, 2)}</pre>
              </div>
            ))}
          </div>
        ) : null}
      </div>

      <div className="basis-3/4 max-h-[80vh] overflow-y-scroll">
        <div className="flex flex-wrap gap-1">
          <Form title="Signup" buttonLabel="Signup" onSubmit={handleSignup}>
            <Input name="firstName" label="First Name" />
            <Input name="lastName" label="Last Name" />
            <Input name="phone" label="Phone" />
            <Input type="email" name="email" label="Email" />
            <Input type="password" name="password" label="Password" />
          </Form>

          <Form title="Contact" buttonLabel="Send" onSubmit={handleContact}>
            <Input name="firstName" label="First Name" />
            <Input name="lastName" label="Last Name" />
            <Input type="email" name="email" label="Email" />
            <Input name="subject" label="Subject" />
            <Input name="message" label="Message" />
          </Form>

          <Form
            title="Update Account"
            buttonLabel="Update"
            onSubmit={handleUpdate}
          >
            <Input name="phone" label="Phone" />
            <Input type="email" name="email" label="Email" />
            <Input
              type="password"
              name="password"
              label="Password For Verification"
            />
          </Form>

          <Form
            title="Change Password"
            buttonLabel="change"
            onSubmit={handleChangePass}
          >
            <Input type="text" name="oldPassword" label="Old Password" />
            <Input type="text" name="password" label="Password" />
          </Form>

          <Form title="Signin" buttonLabel="Signin" onSubmit={handleSignin}>
            <Input type="email" name="email" label="Email" />
            <Input type="password" name="password" label="Password" />
          </Form>
        </div>

        <div className="flex gap-2 mt-4 mb-4">
          <Button onClick={handleSignout}>Signout</Button>
          <Button onClick={handleCreatePaymentIntent}>
            Create Payment Intent
          </Button>
        </div>

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
      </div>
    </div>
  );
}
