import waitOn from "wait-on";
import { hostingPort } from "./getHostingPort";
import "./loadEnv"; // Load environment variables

const api = process.env.SERVER_API;
const api_check = api ? `${api}/primes/2` : undefined;

console.log("api_check:", api_check);

const port = hostingPort;
const baseUrl = `http://127.0.0.1:${port}`;

console.log("baseUrl in waitEmu:", baseUrl);

const resources = [api_check, baseUrl].filter(
  (resource): resource is string => typeof resource === "string"
);

console.log("resources in waitEmu:", resources);

waitOn({ resources })
  .then(() => {
    console.log("Emulators client and server are ready");
  })
  .catch((error) => {
    console.error("Error waiting for Emulators client and server:", error);
  });
