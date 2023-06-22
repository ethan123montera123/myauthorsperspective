import Stripe from "stripe";
import { stripe as stripeConfig } from "./config";

const { secretKey, apiVersion } = stripeConfig;

export const stripe = new Stripe(secretKey, { apiVersion });
