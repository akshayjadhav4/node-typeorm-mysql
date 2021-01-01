import { Request, Response } from "express";
import { getConnection } from "typeorm";
import { User } from "../entity/User";

export const addUser = async (req: Request, res: Response) => {
  const userRepository = getConnection().getRepository(User);
  const user = userRepository.create(req.body);
  await userRepository
    .save(user)
    .then((user) => {
      return res.json({
        result: user,
        message: "User added in DB.",
      });
    })
    .catch((error) => {
      console.log("ERROR WHILE CREATING USER", error);
    });
};

export const getUser = async (req: Request, res: Response) => {
  const userRepository = getConnection().getRepository(User);
  await userRepository
    .findOne(req.params.id)
    .then((user) => {
      if (user) {
        return res.json({
          result: user,
          message: "Fetched user with id",
        });
      } else {
        return res.json({
          message: "No user with given id",
        });
      }
    })
    .catch((error) => {
      console.log("ERROR WHILE HETTING USER WITH ID", error);
    });
};

export const getAllUsers = async (req: Request, res: Response) => {
  const userRepository = getConnection().getRepository(User);
  const users = await userRepository
    .find()
    .then((users) => {
      if (users) {
        return res.json({
          result: users,
          message: "Fetched All users",
        });
      } else {
        return res.json({
          message: "No users found",
        });
      }
    })
    .catch((error) => {
      console.log("ERROR WHILE HETTING USER All USERS", error);
    });
};

export const updateUserWithId = async (req: Request, res: Response) => {
  const userRepository = getConnection().getRepository(User);
  const user = await userRepository.findOne(req.params.id);
  userRepository.merge(user, req.body);
  await userRepository
    .save(user)
    .then((user) => {
      return res.json({
        result: user,
        message: "User updated",
      });
    })
    .catch((error) => {
      console.log("ERROR WHILE UPDATING USER", error);
    });
};

export const deleteUser = async (req: Request, res: Response) => {
  const userRepository = getConnection().getRepository(User);
  await userRepository
    .delete(req.params.id)
    .then(() => {
      return res.json({
        message: "User Deleted",
      });
    })
    .catch((error) => {
      console.log("ERROR WHILE DELETING USER", error);
    });
};
