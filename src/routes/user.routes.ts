import { Router } from "express";
import { sayHello } from "../controllers/user";

const usersRouter = Router();

usersRouter.get("/", sayHello);

export default usersRouter;
