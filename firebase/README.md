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

## Access Required

The extension will operate with the following IAM roles:
