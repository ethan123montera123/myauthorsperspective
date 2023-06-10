export enum Environment {
  DEVELOPMENT = "development",
  PRODUCTION = "production",
}

const app = Object.freeze({
  port: parseInt(process.env["PORT"] || "3000", 10),
  env:
    process.env["NODE_ENV"] &&
    process.env["NODE_ENV"].toLowerCase() === Environment.PRODUCTION
      ? Environment.PRODUCTION
      : Environment.DEVELOPMENT,
});

export type AppConfig = typeof app;
export default app;
