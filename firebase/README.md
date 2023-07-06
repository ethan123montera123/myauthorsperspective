# Firebase Functions

**Description**: Set of firebase functions deployed for
[My Author's Perspective](https://github.com/ethan123montera123/myauthorsperspective).

## Use Cases

- Process One-Time payments with [Stripe Checkouts](https://stripe.com/docs/payments/checkout).
- Sync Customer and Order data between [Cloud Firestore](https://firebase.google.com/docs/firestore) and
  [Stripe Dashboard](https://dashboard.stripe.com).
- Send emails to admin and customer for the products placed on the front-end, as well as for contact us
  concerns.

## Dependencies

### Firebase

- [Cloud Firestore](https://firebase.google.com/docs/firestore) to store customer, product, and payment
  details.
- [Firebase Authentication](https://firebase.google.com/docs/auth) to enable different signup options for
  the users.

### Stripe

- [Restricted Key](https://stripe.com/docs/keys#limit-access) with the following access:
  - Write Access
    - Customers
    - Payment Intents

### SendGrid

- [Restricted API Key](https://app.sendgrid.com/settings/api_keys) with the following access:
  - Full Access
    - Mail Send
    - Mail Settings

## Billing

This extension uses the following Firebase services which may have associated charges:

- Cloud Firestore
- Cloud Functions
- Firebase Authentication

This extension also uses the following third-party services:

- Stripe Payments [(pricing information)](https://stripe.com/pricing)
- Stripe Billing
- SendGrid Mail [(pricing information)](https://sendgrid.com/pricing/)

## Setup

### Prerequisites

- [**JDK v11+**](https://www.oracle.com/java/technologies/javase/jdk20-archive-downloads.html) - Needed to
  run firestore emulator, if firebase emulators are to be used for local development.
- [**Stripe CLI**](https://stripe.com/docs/stripe-cli) - Needed to be able to test and run webhooks locally.

### Setup

1. Clone this project directory.
2. Install `Firebase CLI` globally using `npm i firebase-tools -g`. This is required for linking the
   firebase app locally, and for running emulators.
3. Login to the `Firebase CLI` by running `firebase login` in the console.
4. Go into the functions directory by running the command `cd firebase/functions` from the root directory.
5. Once logged in, run `firebase use --add my-authors-perspective-dev` in the console to add this project as
   the active project. This is assuming that you have already been added to the firebase project.
6. Installed the required dependencies using `npm ci`. (_Note: if this doesn't work use `npm i`_)
7. Run `npm run serve` to run the firebase emulators. Configurations can be seen in `firebase.json`, and
   local dashboard can be seen at `localhost:4000`.
8. To be able to use the emulators in javascript, you can create the following configuration in the
   initialization of the firebase project.

```js
import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

const app = initializeApp(config);
const auth = getAuth(app);
const db = getFirestore(app);

// You can view the list of configurated ports used for the firebase emulators in `firebase/firebase.json`.
connectAuthEmulator(auth, "http://127.0.0.1:9099");
connectFirestoreEmulator(db, "127.0.0.1", 8080);
```

8. If emulation of webhooks are required for the session, then you must also download `Stripe CLI` from the
   prerequisites.
9. After downloading, place the extracted `stripe.exe` anywhere, and add it to the `PATH` environment
   variable.
10. Run `stripe login` on the console to link your local environment to Stripe.
11. Once logged in, register the webhook using `stripe listen --forward-to [webhook-endpoint]`. You can
    check the firebase logs for the actual endpoint of the webhook.
12. Once stripe is readily listening at the webhook endpoint, they would then return a signing secret. Add
    this secret to the `.env` file as `STRIPE_WEBHOOK_SECRET`.
13. Afterwards, you can test if the webhook is working by running `stripe trigger payment_intent.succeeded.`
    You should see an activity in the terminal of step 11.

### Other Commands

- **[Backend Changes]** If changes are to be made on-the-fly to the source code, then you must also run
  `npm run build:watch` on a separate terminal to transpile `typescript` code.
- **[Email Templating]** If templating is to be done on emails, you can run `npm run email` to be able to
  see changes on-the-fly, emails can be seen at `localhost:3001`.

## Cloud Functions and Usage

### User API

- **api-user-createUser**: Creates a user, with the following attributes:
  - **Auth Account**: Created in `Firebase Authentication` to allow the user to sign in with an email and
    password.
  - **User Profile**: Created in `Firestore` to track user information such as name, phone, and stripe ID.
  - **Stripe Account**: Created in `Stripe` to bind payment intents to the customer.

```js
const app = initializeApp();
const functions = getFunctions(app);

// Get the callable function on the front-end
const createUser = httpsCallable(functions, "api-stripe-createUser");

const user = {
  firstName: "John",
  lastName: "Smith",
  email: "john@smith.com", // must be unique
  phone: "091234567890", // must be unique
  password: "Abcd1234!",
};

try {
  // Creates the user, along with their stripe account, and profile
  // This also returns the data which contains the user record, with their password
  // omitted from the returned value.
  const { data } = await createUser(user);
} catch (error) {
  if (error instanceof FirebaseError) {
    if (error.code === "functions/invalid-argument") {
      // This error code is used for validation errors
      error.details; // This contains the objet for the validation errors
    } else {
      // handle other Firebase Errors, like:
      // - functions/internal
    }
  } else {
    // handle general errors
  }
}
```

- **api-user-updateUser**: Updates the currently authenticated user, and syncs the changes to their profile,
  auth account, and stripe account.

```js
const app = initializeApp();
const functions = getFunctions(app);

// Get the callable function on the front-end
const updateUser = httpsCallable(functions, "api-stripe-updateUser");

// You don't have to include all the fields in the object below,
// since this endpoint supports partial updates
const details = {
  email: "john@smith.com", // must be unique
  phone: "091234567890", // must be unique
};

try {
  // Updates the user, along with their stripe account, and profile
  // This returns the user data, which include their name, email, and phone
  const { data } = await updateUser(details);
} catch (error) {
  if (error instanceof FirebaseError) {
    if (error.code === "functions/invalid-argument") {
      // This error code is used for validation errors
      error.details; // This contains the objet for the validation errors
    } else {
      // handle other Firebase Errors, like:
      // - functions/unauthenticated
      // - functions/internal
    }
  } else {
    // handle general errors
  }
}
```

### Stripe Payments

- **api-stripe-createPaymentIntent**: Creates a payment intent based on the services passed. This returns a
  `secret` to the client which can be used to complete the payment.

```js
const app = initializeApp();
const functions = getFunctions(app);

// Get the callable function on the front-end
const createPaymentIntent = httpsCallable(functions, "api-stripe-createPaymentIntent");

const services = [
  {
    service: "ABCD1234", // service ID
    inclusions: [1, 2, 5, 7], // inclusions ID
    quantity: 2, // quantity to be ordered
  },
  {
    service: "XYZ1234",
    inclusions: [], // default value can be omitted
    quantity: 1, // default value can be omitted
  },
];

try {
  // Creates a payment intent
  const { data } = await createPaymentIntent(services);
  data.secret; // Secret to be used to complete the payment intent
} catch (error) {
  if (error instanceof FirebaseError) {
    if (error.code === "functions/invalid-argument") {
      // This error code is used for validation errors
      error.details; // This contains the objet for the validation errors
    } else {
      // handle other Firebase Errors, like:
      // - functions/unauthenticated
      // - functions/internal
    }
  } else {
    // handle general errors
  }
}
```

- **api-stripe-webhook**: Endpoint that listens to [Stripe Events](https://stripe.com/docs/api/events). This
  listens to the following:
  - **payment_intent.succeeded**: Upon successful payment of the intent that was created by the
    `api-stripe-createPaymentIntent`, it then sends out email receipts via `SendGrid`, with the
    `ReceiptEmail` template.

### Contact API

- **api-contact-sendContactEmail**: Contact gateway for the customers to channel their concerns,
  suggestions, and complaints to the company.

```js
const app = initializeApp();
const functions = getFunctions(app);

// Get the callable function on the front-end
const sendContactEmail = httpsCallable(functions, "api-contact-sendContactEmail");

const data = {
  firstName: "John",
  lastName: "Smith",
  email: "john@smith.com",
  subject: "Lorem Ipsum.",
  message: "Lorem ipsum sitar dolor.",
};

try {
  // Send the contact email to the company with the `ContactEmail` template
  const { data } = await sendContactEmail(data);
  data.msg; // Contains the success message
} catch (error) {
  if (error instanceof FirebaseError) {
    if (error.code === "functions/invalid-argument") {
      // This error code is used for validation errors
      error.details; // This contains the objet for the validation errors
    } else {
      // handle other Firebase Errors, like:
      // - functions/unauthenticated
      // - functions/internal
    }
  } else {
    // handle general errors
  }
}
```

## Access Required

The extension will operate with the following IAM roles:
