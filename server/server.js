import express from "express";
import logger from "morgan";

const API_PORT = 3001;

const app = express();

app.use(logger("dev"));
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ limit: "20mb", extended: false }));

app.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});

app.listen(API_PORT, () => {
  // eslint-disable-next-line
  console.log(`Example app listening on port ${API_PORT} -> http://localhost:${API_PORT}`);
});
