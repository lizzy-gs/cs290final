import { mustLoggedIn } from "../auth.js";

export default [mustLoggedIn, (req, res) => {
  const username = req.user.username;

  const row = req.db.prepare(
    "SELECT username, sec_studied, pomodoro_length, short_break_length, long_break_length  FROM users WHERE username = ?",
  ).get(
    username,
  );

  res.send(row);
}];
