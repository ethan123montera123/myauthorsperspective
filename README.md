# My Author's Perspective

## Setup

### Prerequisites

- [**JDK v11+**](https://www.oracle.com/java/technologies/javase/jdk20-archive-downloads.html) - Needed to
  run firestore emulator, if firebase emulators are to be used for local development.

### Config

1. Clone the project to your local machine.
2. `cd` into the directory.

### Local Functions Configuration

1. Make sure that you have `JDK v11+`.
2. Go into the functions directory using `cd firebase/functions`.
3. Install the required dependencies using `npm ci`.
6. Run `npm run serve` to start the firebase emulators, and serve the project locally.
7. To be able to use the emulators in javascript, you can create the following configuration in the
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

8. You may also go to `http://127.0.0.1:4000` to view the local firebase dashboard.

## Resources

- [Cloud Functions Docs](https://github.com/ethan123montera123/myauthorsperspective/blob/master/firebase/README.md)

## License

[Unlicense](https://github.com/ethan123montera123/myauthorsperspective/blob/master/LICENSE)
