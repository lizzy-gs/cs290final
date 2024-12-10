import { mustLoggedIn } from "../auth.js";

export const get = [mustLoggedIn, (req, res) => {
    const username = req.user.username;

    // Fetch todos for the logged-in user
    const row = req.db.prepare(
        "SELECT todos FROM users WHERE username = ?",
    ).get(
        username,
    );

    // Parse todos JSON string
    const todos = row && row.todos ? JSON.parse(row.todos) : [];

    // Render the tasks.handlebars page with the todos
    res.render("tasks", { todos });
}];
