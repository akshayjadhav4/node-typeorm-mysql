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
