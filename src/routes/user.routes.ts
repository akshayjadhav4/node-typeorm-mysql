import { Router } from "express";
import {
  addUser,
  getUser,
  getAllUsers,
  updateUserWithId,
  deleteUser,
} from "../controllers/user";

const usersRouter = Router();

usersRouter.post("/user/add", addUser);
usersRouter.get("/user/:id", getUser);
usersRouter.get("/users", getAllUsers);
usersRouter.put("/user/update/:id", updateUserWithId);
usersRouter.delete("/user/delete/:id", deleteUser);

export default usersRouter;
