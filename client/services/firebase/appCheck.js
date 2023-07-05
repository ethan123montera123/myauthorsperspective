import { ReCaptchaV3Provider, initializeAppCheck } from "firebase/app-check";
import { useEffect, useState } from "react";

import { app } from "./firebase";

/**
 * Hook for initializing app check.
 *
 * @description
 * App check initialization is finnicky with React, it needs to be initialized in a
 * useEffect or else it gets re-rendered per run which causes invalidation of tokens.
 *
 * You must run this at `_app.js` to ensure that it always run at app start-up, and only
 * runs once.
 *
 * @returns {import("firebase/app-check").AppCheck | null} Returns the app check instance.
 */
export function useAppCheck() {
  const [appCheck, setAppCheck] = useState(null);

  useEffect(() => {
    const SITE_KEY = process.env.NEXT_PUBLIC_FIREBASE_RECAPTCHA_SITE_KEY;
    const DEBUG_TOKEN = process.env.NEXT_PUBLIC_FIREBASE_APPCHECK_DEBUG_TOKEN;
    const NODE_ENV = process.env.NEXT_PUBLIC_NODE_ENV;

    if (!SITE_KEY || (NODE_ENV !== "production" && !DEBUG_TOKEN)) return;

    if (appCheck === null) {
      if (NODE_ENV !== "production" && DEBUG_TOKEN) {
        // This is to mock the token, and not create unnecessary logs to ReCAPTCHA
        // during development
        Object.assign(window, { FIREBASE_APPCHECK_DEBUG_TOKEN: DEBUG_TOKEN });
      }

      const appCheckInstance = initializeAppCheck(app, {
        provider: new ReCaptchaV3Provider(SITE_KEY),
        isTokenAutoRefreshEnabled: true,
      });

      setAppCheck(appCheckInstance);
    }

    return () => {
      // Cleanup the debug token.
      delete window.FIREBASE_APPCHECK_DEBUG_TOKEN;
    };
  }, []);

  return appCheck;
}
