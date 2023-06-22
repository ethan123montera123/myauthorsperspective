import { initializeApp } from "firebase-admin/app";
import { seedFirestore } from "./seeders";

initializeApp();
seedFirestore();

export * as events from "./events";
