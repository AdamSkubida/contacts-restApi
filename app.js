import express from "express";
import logger from "morgan";
import cors from "cors";
import { router as contactsRouter } from "./routes/api/router.js";

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

//place for app.use(/api/contacts)
app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((req, res) => {
  res.status(500).json({ message: err.message });
});

export default app;
