import * as express from "express";
import routes from "./src/routes";

const app = express();
app.use(express.json());

app.use(routes);

const PORT = 2004;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
