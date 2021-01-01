## step 1

npm init

## step 2

npm i typescript --save-dev

## step 3

Then let's create a **tsconfig.json** file which contains the configuration required for the application to compile and run.

## step 4 create index.ts

create index.ts in root folder and add console.log() to test.

```
console.log("Express Setup in progress...");

```

## step 5 compile ts file

open terminal and run

```
tsc
```

it will generate **index.js** run that file

```
node index.js
```

## step 6 config ts-node

```
npm install -D ts-node
```

**_package.json_**

```
"scripts": {
    "start": "ts-node src/index.ts"
}

```

and delete **index.js**

## step 7 add Express to our application

```
npm i express  @types/express
```

make changes in **index.ts**

**_index.ts_**

```

import * as express from "express";
import { Request, Response } from "express";

const app = express();
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from / route");
});

const PORT = 2004;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

```

now open terminal and run command

```
npm start
```

server will start and check **_http://localhost:2004/_** on browser

```
Hello from / route
```

## step 8 adding TypeORM

Here we are going to use TypeORM with MySQL

```
npm i typeorm mysql reflect-metadata
```

create **ormconfig.json** in root folder and add database connection config options.

**_ormconfig.json_**

```
{
    "type": "mysql",
    "host": "localhost",
    "port": 3306,
    "username": "root",
    "password": "",
    "database": "test",
    "entities": ["src/entity/*.js"],
    "logging": true,
    "synchronize": true
}
```

## step 9 creating entity

Here we will create a User entity for that create **User.ts** in **./src/entity/User.ts**

**_User.ts_**

```
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  age: number;
}

```

## creating connection with DB

**_index.ts_**

```
import * as express from "express";
import routes from "./src/routes";
import { createConnection } from "typeorm";

createConnection()
  .then((connection) => {
    const app = express();
    app.use(express.json());

    app.use(routes);

    const PORT = 2004;
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("ERROR WHILE CONNECTING DB ", error);
  });

```

## Adding user

Create controllers **./src/controllers/user.ts**

**_user.js controller_**

```
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

```

Create routes **./src/routes/user.routes.ts**

**_user.route.js_**

```
import { Router } from "express";
import { addUser } from "../controllers/user";

const usersRouter = Router();

usersRouter.post("/user/add", addUser);

export default usersRouter;


```

**_index.js (routes)_**

```
import { Router } from "express";
import usersRouter from "./user.routes";

const routes = Router();

routes.use("/api", usersRouter);

export default routes;

```

## Getting user with ID

**_user.js controller_**

```
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
```

**_user.route.js_**

```
import { Router } from "express";
import { addUser, getUser } from "../controllers/user";

const usersRouter = Router();

usersRouter.post("/user/add", addUser);
usersRouter.get("/user/:id", getUser);

export default usersRouter;



```

## getting all users

**_user.js controller_**

```
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
```

**_user.route.js_**

```
import { Router } from "express";
import { addUser, getUser, getAllUsers } from "../controllers/user";

const usersRouter = Router();

usersRouter.post("/user/add", addUser);
usersRouter.get("/user/:id", getUser);
usersRouter.get("/users", getAllUsers);

export default usersRouter;

```

## Update user

**_user.js controller_**

```
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
```

**_user.route.js_**

```
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


```

## deleting user

**_user.js controller_**

```
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
```

**_user.route.js_**

```
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



```
