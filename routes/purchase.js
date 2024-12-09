import { readFile } from "node:fs/promises";
import { mustLoggedIn } from "../auth.js";

export default [mustLoggedIn, async (req, res) => {
  const username = req.user.username;

  const row = req.db.prepare(
    "SELECT sec_studied, credits_spent, purchases FROM users WHERE username = ?",
  ).get(
    username,
  );

  row.purchases = JSON.parse(row.purchases);

  const credits_available = (row.sec_studied / 60) - row.credits_spent;

  const themes = JSON.parse(await readFile("themes.json"));

  const theme = themes[req.body.theme];

  if (theme.creditCost > credits_available) {
    res.status(400).json({ error: "not enough credits" });
    return;
  }

  const credits_spent = row.credits_spent + theme.creditCost;

  req.db.prepare(`UPDATE users SET
		credits_spent = ?,
		purchases = ?
	WHERE
		username = ?`).run([
    credits_spent,
    JSON.stringify([...row.purchases, theme]),
    username,
  ]);

  res.status(204).end();
}];
