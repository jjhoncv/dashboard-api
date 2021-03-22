import express, { Application, Router } from "express";
import cors from "cors";

import { authRoutes } from "./routes";

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
    app.listen("7000");
    console.log("server on port 7000 or http://localhost:7000");
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
