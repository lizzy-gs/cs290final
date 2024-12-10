import { readFile } from "node:fs/promises";

export default async (req, res) => {
  const themes = JSON.parse(await readFile("themes.json"));
  var colorOptions = Object.values(themes)
  res.render("home", {
    colorOptions: colorOptions
  });
};