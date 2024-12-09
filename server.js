import express from "express";
import { engine } from "express-handlebars";
import { router } from "express-file-routing";
import process from "node:process";
import "dotenv/config"; // load our environment variables from `.env`
import { attachDB, initDB } from "./db.js";
import cookieParser from "cookie-parser";

const app = express();

// make it possible to access `req.db` for each request
const db = initDB();
app.use(attachDB(db));

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// setup file based router
app.use("/", await router());

// setup handlebars templating
app.engine(
  "handlebars",
  engine({
    defaultLayout: "main",
  }),
);
app.set("view engine", "handlebars");
app.set("views", "./views");

// Static files
app.use(express.static("static"));

const port = process.env.PORT || 3000;

const server = app.listen(port, function () {
  console.log("== Server is listening on port", server.address().port);
});
