import { Router } from "express";
import {
  addUser,
  getUser,
  getAllUsers,
  updateUserWithId,
} from "../controllers/user";

const usersRouter = Router();

usersRouter.post("/user/add", addUser);
usersRouter.get("/user/:id", getUser);
usersRouter.get("/users", getAllUsers);
usersRouter.put("/user/update/:id", updateUserWithId);

export default usersRouter;
