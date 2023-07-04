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
6. Installed the required dependencies using `npm ci`.
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

### User Events

- **events-users-createStripeAccount**: Creates a stripe account once a user document is created on `users`
  collections, usually done in unison with `auth` creation.

```js
const app = initializeApp();
const auth = getAuth(app);
const db = getFirestore(app);

const usersRef = collection(db, "users");

// Create an account
const credentials = await createUserWithEmailAndPassword(auth, email, password);

// From the created account, create a user document with additional context these are required.
// Triggers the `createStripeAccount` event.
await setDoc(doc(usersRef, credentials.uid), {
  firstName,
  lastName,
  email,
  phone,
});
```

- **events-users-syncAccountUpdateToStripe**: Updates stripe account with updated details from the
  corresponding `user` document on the `users` collection.

```js
const app = initializeApp();
const db = getFirestore(app);

// Get the reference to a document with a given `uid` from the `users` collection.
const userRef = doc(db, "users", uid);

// Triggers the `syncAccountUpdateToStripe` and updates the account information in stripe.
await updateDoc(userRef, {
  firstName,
  lastName,
  email,
  phone,
});
```

- **events-users-syncAccountDeleteToStripe**: Deletes corresponding stripe account of a deleted `user`
  document from the `users` collection.

```js
const app = initializeApp();
const auth = getAuth(app);
const db = getFirestore(app);

// NOTE: Since users are usually created in unison with auth. You should also delete the corresponding auth account.
const credentials = await signInWithEmailAndPassword(email, password);
await credentials.user.delete();

// Get the reference to the user's document from the `users` collection.
const userRef = doc(db, "users", credentials.user.uid);

// Triggers the `syncAccountDeleteToStripe` and deletes the correspong stripe account.
await deleteDoc(userRef);
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

// Creates a payment intent
const { data } = await createPaymentIntent(services);

data.secret; // Secret to be used to complete the payment intent
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

// Send the contact email to the company with the `ContactEmail` template
const { data } = await sendContactEmail(data);

data.msg; // Contains the success message
```

## Access Required

The extension will operate with the following IAM roles:
