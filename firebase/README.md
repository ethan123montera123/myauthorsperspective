# Firebase Functions

**Description**: Set of firebase functions deployed for
[My Author's Perspective](https://github.com/ethan123montera123/myauthorsperspective).

## Use Cases

- Process One-Time payments with [Stripe Checkouts](https://stripe.com/docs/payments/checkout).
- Sync Customer and Order data between [Cloud Firestore](https://firebase.google.com/docs/firestore) and
  [Stripe Dashboard](https://dashboard.stripe.com).
- Send emails to admin and customer for the products placed on the front-end.

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

## Billing

This extension uses the following Firebase services which may have associated charges:

- Cloud Firestore
- Cloud Functions
- Firebase Authentication

This extension also uses the following third-party services:

- Stripe Payments [(pricing information)](https://stripe.com/pricing)
- Stripe Billing

## Setup

### Prerequisites

- [**JDK v11+**](https://www.oracle.com/java/technologies/javase/jdk20-archive-downloads.html) - Needed to
  run firestore emulator, if firebase emulators are to be used for local development.
- [**Stripe CLI**](https://stripe.com/docs/stripe-cli) - Needed to be able to test and run webhooks locally.

### Setup

1. Clone this project directory.
2. Go into the functions directory by running the command `cd firebase/functions` from the root directory.
3. Installed the required dependencies using `npm ci`.
4. Run `npm run serve` to run the firebase emulators. Configurations can be seen in `firebase.json`, and
   local dashboard can be seen at `localhost:4000`.
5. If changes are to be made on-the-fly to the source code, then you must also run `npm run build:watch` on
   a separate terminal to transpile `typescript` code.
6. If changes are to be made to emails, then you must also run `npm run email`, emails can be seen at
   `localhost:3001`.
7. If webhooks are to be utilized then a `Stripe CLI` login is required, and a webhook configuration is to
   be set.

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

## Access Required

The extension will operate with the following IAM roles:
