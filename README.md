# My Author's Perspective

## Setup

### Prerequisites

- [**JDK v11+**](https://www.oracle.com/java/technologies/javase/jdk20-archive-downloads.html) - Needed to
  run firestore emulator, if firebase emulators are to be used for local development.

### Config

1. Clone the project to your local machine.
2. `cd` into the directory.

### Local Functions Configuration

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

## Resources

- [Cloud Functions Docs](https://github.com/ethan123montera123/myauthorsperspective/blob/master/firebase/README.md)

## License

[Unlicense](https://github.com/ethan123montera123/myauthorsperspective/blob/master/LICENSE)
