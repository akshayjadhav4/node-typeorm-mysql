import { Router } from "express";
import { addUser, getUser } from "../controllers/user";

const usersRouter = Router();

usersRouter.post("/user/add", addUser);
usersRouter.get("/user/:id", getUser);

export default usersRouter;
