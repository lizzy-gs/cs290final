import { readFile } from "node:fs/promises";
import { mustLoggedIn } from "../auth.js";

export const get = [mustLoggedIn, async (req, res) => {
	const themes = JSON.parse(await readFile("themes.json"));
    const username = req.user.username;

    // Fetch todos for the logged-in user
    const row = req.db.prepare(
        "SELECT todos, current_theme FROM users WHERE username = ?",
    ).get(
        username,
    );

    // Parse todos JSON string
    const todos = row && row.todos ? JSON.parse(row.todos) : [];
	const current_theme = row && row.current_theme ? row.current_theme : "red";

    // Render the tasks.handlebars page with the todos
    res.render("tasks", { todos, theme: themes[current_theme] });
}];
