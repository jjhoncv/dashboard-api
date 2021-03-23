import { Router, Request, Response } from "express";

const route: Router = Router();

route.get("/", (req: Request, res: Response) => {
  res.send("<h1>Dashboard Api</h1>");
});

export const homeRoutes = route;
