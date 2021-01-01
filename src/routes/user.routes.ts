import { Router } from "express";
import { addUser, getUser, getAllUsers } from "../controllers/user";

const usersRouter = Router();

usersRouter.post("/user/add", addUser);
usersRouter.get("/user/:id", getUser);
usersRouter.get("/users", getAllUsers);

export default usersRouter;
