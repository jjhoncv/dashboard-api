import { Router, Request, Response } from "express";
import { login } from "./model";

const route: Router = Router();

route.post("/login", async (req: Request, res: Response) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    const user = await login(username, password);

    if (user) {
      const data = { user, token: 123456789 };
      res.json({
        status: true,
        data,
        message: "Logeado satisfactoriamente",
      });
    } else {
      res.json({
        status: false,
        message: "Usuario o Password incorrecto",
      });
    }
  } catch (e) {
    res.json({
      status: false,
      message: e.message,
    });
  }
});

export const authRoutes = route;
