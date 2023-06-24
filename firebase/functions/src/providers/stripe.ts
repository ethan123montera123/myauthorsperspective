import Stripe from "stripe";
import { stripe as stripeConfig } from "./config";

const { SECRET_KEY, API_VERSION } = stripeConfig;

export const stripe = new Stripe(SECRET_KEY, { apiVersion: API_VERSION });
