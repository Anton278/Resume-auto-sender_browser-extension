import axios from "axios";

import { env } from "../env";

export const api = axios.create({
  baseURL:
    env.JS_ENV === "development"
      ? "http://localhost:5000"
      : "http://localhost:5001",
});
