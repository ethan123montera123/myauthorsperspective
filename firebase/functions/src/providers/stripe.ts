import Stripe from "stripe";
import config from "./config";

const { secretKey, apiVersion } = config.stripe;
const stripe = new Stripe(secretKey, { apiVersion });

export default stripe;
