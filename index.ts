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
