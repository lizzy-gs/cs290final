import { readFile } from "node:fs/promises";
import { tryLoggedIn } from "../auth.js";

export default [tryLoggedIn, async (req, res) => {
  const themes = JSON.parse(await readFile("themes.json"));
  const colorOptions = Object.values(themes);

  let loggedIn = req.user != undefined;
  let userThemes = [];
  if (loggedIn) {
    const row = req.db.prepare("SELECT purchases FROM users WHERE username = ?")
      .get(req.user.username);
    userThemes = JSON.parse(row.purchases);
  }

  colorOptions[0].locked = false;
  for (let i = 1; i < colorOptions.length; i++) {
    colorOptions[i].locked = true;
  }

  userThemes.forEach((theme) => {
	for (let i = 0; i < colorOptions.length; i++) {
		if (theme.name == colorOptions[i].name) {
			colorOptions[i].locked = false
		}
	}
  });

  res.render("home", {
    colorOptions: colorOptions,
  });
}];
