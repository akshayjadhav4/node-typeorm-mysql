import { Router } from "express";
import { addUser } from "../controllers/user";

const usersRouter = Router();

usersRouter.post("/user/add", addUser);

export default usersRouter;
