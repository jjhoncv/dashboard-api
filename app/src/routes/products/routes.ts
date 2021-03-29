import { Router, Request, Response } from "express";
import { read, create, remove } from "./model";

const route: Router = Router();

route.get("/:id?", async (req: Request, res: Response) => {
  const id = req.params.id || null;
  try {
    const data = await read(id);

    if (!!data) {      
      res.json({
        status: true,
        data
      });
    } else {
      res.json({
        status: false,
        message: "No se pudo traer el recurso",
      });
    }
  } catch (e) {
    res.json({
      status: false,
      message: e.message,
    });
  }
});

route.delete("/:id?", async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const data = await remove(id);

    if (!!data) {      
      res.json({
        status: true,
        data
      });
    } else {
      res.json({
        status: false,
        message: "No se pudo eliminar el recurso",
      });
    }
  } catch (e) {
    res.json({
      status: false,
      message: e.message,
    });
  }
});

route.post("/", async (req: Request, res: Response) => {
  const name = req.body.name;
  const code = req.body.code;
  const price = req.body.price;
  const description = req.body.description;

  try {
    const data = await create({ name, code, price, description });
    if (!!data) {      
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

export const productRoutes = route;
