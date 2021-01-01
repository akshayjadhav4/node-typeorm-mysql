import { Request, Response } from "express";

export const sayHello = (req: Request, res: Response) => {
  res.send("Hello from / route and Routes and Controllers setup done");
};
