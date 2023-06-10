import app from "./app";
import cors from "./cors";
import swagger from "./swagger";

export * from "./app";
export * from "./cors";
export * from "./swagger";

export default () => Object.freeze({ app, cors, swagger });
