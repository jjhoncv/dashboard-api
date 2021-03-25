import { Router, Request, Response } from "express";
import { login, register } from "./model";

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

route.post("/register", async (req: Request, res: Response) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;

  try {
    const user = await register(username, password, email);
    if (user) {
      const data = { user, token: 123456789 };
      res.json({
        status: true,
        data,
        message: "Registrado satisfactoriamente",
      });
    } else {
      res.json({
        status: false,
        message: "No se pudo registrar al usuario",
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
