const cors = {
  origin: process.env["CORS_ORIGIN"] ?? "*",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: [
    "Authorization",
    "Content-Type",
    "Access-Control-Allow-Headers",
  ],
};

export type CorsConfig = typeof cors;
export default cors;
