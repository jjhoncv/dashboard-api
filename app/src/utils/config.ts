import * as dotenv from "dotenv";
import path from "path";

const fileEnv = process.env.NODE_ENV ? "" : ".local";
const pathEnv = path.join(__dirname, "./../../.env" + fileEnv);
dotenv.config({ path: pathEnv });
