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
