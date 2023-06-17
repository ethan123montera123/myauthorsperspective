# Firebase Functions

**Description**: Set of firebase functions deployed for
[My Author's Perspective](https://github.com/ethan123montera123/myauthorsperspective).

## Use Cases

- Process One-Time payments with [Stripe Checkouts](https://stripe.com/docs/payments/checkout).
- Sync Customer and Product data between [Cloud Firestore](https://firebase.google.com/docs/firestore) and
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
    - Checkout Sessions
    - Customer Portal
  - Read Access
    - Subscriptions
    - Prices

## Billing

This extension uses the following Firebase services which may have associated charges:

- Cloud Firestore
- Cloud Functions
- Firebase Authentication

This extension also uses the following third-party services:

- Stripe Payments [(pricing information)](https://stripe.com/pricing)
- Stripe Billing

## Cloud Functions and Usage

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
await setDoc(doc(usersRef, credentials.uid), {
  firstName,
  lastName,
  email,
  phone,
});
```

## Access Required

The extension will operate with the following IAM roles:
