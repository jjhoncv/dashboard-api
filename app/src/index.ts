import express, { Application, Router } from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import { authRoutes } from "./routes";

const pathEnv = "./../../.env";
dotenv.config({ path: pathEnv });

const App = () => {
  const app: Application = express();

  const middlewares = () => {
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
  };

  const routes = () => {
    const router: Router = Router();
    router.use("/auth", authRoutes);
    app.use("/", router);
  };

  const init = () => {
    middlewares();
    routes();
    app.listen(process.env.SERVER_PORT);
    console.log(
      "server on " + process.env.SERVER_HOST + ":" + process.env.SERVER_PORT
    );
  };

  return {
    init,
  };
};

async function main() {
  const app = App();
  app.init();
}

main();
