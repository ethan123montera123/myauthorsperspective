import { ReCaptchaV3Provider, initializeAppCheck } from "firebase/app-check";
import { createRef, useEffect } from "react";

import { app } from "./firebase";

/**
 * @type {import("react").RefObject<import("firebase/app-check").AppCheck | null>}
 *
 * This is a global variable that references the app check instance, to ensure
 * that only one copy is created per app.
 */
const appCheck = createRef(null);

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
 * @returns {void} Does not return anything, as it just initializes app check.
 */
export function useAppCheck() {
  useEffect(() => {
    const SITE_KEY = process.env.NEXT_PUBLIC_FIREBASE_RECAPTCHA_SITE_KEY;
    const DEBUG_TOKEN = process.env.NEXT_PUBLIC_FIREBASE_APPCHECK_DEBUG_TOKEN;
    const NODE_ENV = process.env.NEXT_PUBLIC_NODE_ENV;

    if (!SITE_KEY || (NODE_ENV !== "production" && !DEBUG_TOKEN)) return;

    if (appCheck.current === null) {
      if (NODE_ENV !== "production" && DEBUG_TOKEN) {
        // This is to mock the token, and not create unnecessary logs to ReCAPTCHA
        // during development
        Object.assign(window, { FIREBASE_APPCHECK_DEBUG_TOKEN: DEBUG_TOKEN });
      }

      appCheck.current = initializeAppCheck(app, {
        provider: new ReCaptchaV3Provider(SITE_KEY),
        isTokenAutoRefreshEnabled: true,
      });
    }

    return () => {
      // Cleanup the debug token.
      delete window.FIREBASE_APPCHECK_DEBUG_TOKEN;
    };
  }, []);
}
