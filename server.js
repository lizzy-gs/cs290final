import express from "express";
import { engine } from "express-handlebars";
import { router } from "express-file-routing";
import path from "node:path";
import process from "node:process";

const app = express();

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
