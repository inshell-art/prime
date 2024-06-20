import fs from "fs";
import path from "path";
import { getDirname } from "../utils/utils";

const { __dirname } = getDirname(import.meta.url);

const firebaseConfig = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "../firebase.json"), "utf-8")
);

export const hostingPort = firebaseConfig.emulators?.hosting?.port || 5009;
