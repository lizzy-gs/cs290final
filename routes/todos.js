import { mustLoggedIn } from "../auth.js";

export const get = [mustLoggedIn, (req, res) => {
  const username = req.user.username;

  const row = req.db.prepare(
    "SELECT todos FROM users WHERE username = ?",
  ).get(
    username,
  );

  row.todos = JSON.parse(row.todos);

  res.send(row.todos);
}];

export const post = [mustLoggedIn, (req, res) => {
  const username = req.user.username;

  req.db.prepare(
    "UPDATE users SET todos = ? WHERE username = ?",
  ).run(
    req.body.todos,
    username,
  );

  res.status(204);
}];
