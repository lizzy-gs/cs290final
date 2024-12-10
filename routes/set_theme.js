import { readFile } from "node:fs/promises";
import { mustLoggedIn } from "../auth.js";

export default [mustLoggedIn, async (req, res) => {
  const username = req.user.username;

  const row = req.db.prepare(
    "SELECT purchases, current_theme FROM users WHERE username = ?",
  ).get(
    username,
  );

  row.purchases = JSON.parse(row.purchases);
  const owned_themes = row.purchases.map((el)=>el.name)

  if (!owned_themes.includes(req.body.theme)) {
		res.sendStatus(400).end();
		return
  }


  const themes = JSON.parse(await readFile("themes.json"));
  const new_theme_id = getThemeKeyByName(themes, req.body.theme)

  req.db.prepare(`UPDATE users SET
		current_theme = ?
	WHERE
		username = ?`).run([
	new_theme_id,
    username,
  ]);

  res.sendStatus(204).end();
}];

const getThemeKeyByName = (themes, nameLookup) => {
  return Object.entries(themes).find(([key, theme]) =>
    theme.name === nameLookup
  )?.[0];
};
