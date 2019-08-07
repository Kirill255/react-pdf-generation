import express from "express";
import logger from "morgan";
import cors from "cors";
import pdf from "html-pdf";

import pdfTemplate from "./documents";

const API_PORT = 3001;

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ limit: "20mb", extended: false }));

app.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});

app.post("/create-pdf", (req, res) => {
  const options = {};
  pdf.create(pdfTemplate(req.body), options).toFile("./result.pdf", (err) => {
    if (err) {
      res.status(503).json({ message: "Sorry, Service Unavailable!" });
      return;
    }
    res.json(null); // success
  });
});

app.get("/fetch-pdf", (req, res) => {
  res.sendFile(`${__dirname}/result.pdf`);
});

app.listen(API_PORT, () => {
  // eslint-disable-next-line
  console.log(`Example app listening on port ${API_PORT} -> http://localhost:${API_PORT}`);
});
