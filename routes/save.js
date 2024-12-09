import { mustLoggedIn } from "../auth.js";

export const post = [mustLoggedIn, (req, res) => {
  const username = req.user.username;

  const update = req.db.prepare(`UPDATE users SET
		sec_studied = ?,
        pomodoro_length = ?,
        short_break_length = ?,
        long_break_length = ?,
		credits_spent = ?
     WHERE
		username = ?`);

  update.run([
    req.body.totalStudied,
    req.body.pomodoroLength,
    req.body.shortLength,
    req.body.longLength,
    req.body.creditsSpent,
    username,
  ]);

  res.status(204).end();
}];
