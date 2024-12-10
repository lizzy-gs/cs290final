import process from "node:process";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { readFile } from "node:fs/promises";

const JWT_SECRET = process.env.JWT_SECRET || "jwt_secret";

export const tryLoggedIn = (req, res, next) => {
  const token = req.cookies.session;

  if (!token) {
	next();
	return;
  }
  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified;
    next();
  } catch (_err) {
    res.clearCookie("session");
    res.status(403).json({ error: "Invalid session. Please log in again." });
  }
}

export const mustLoggedIn = (req, res, next) => {
  const token = req.cookies.session;

  if (!token) {
    return res.status(401).json({ error: "Access denied. Please log in." });
  }

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified;
    next();
  } catch (_err) {
    res.clearCookie("session");
    res.status(403).json({ error: "Invalid session. Please log in again." });
  }
};

export const registerUser = async (db, username, password) => {

  let defaultTheme = JSON.parse(await readFile("themes.json"))["red"];
  try {
    const hashedPassword = await argon2.hash(password);
    const insert = db.prepare(
      "INSERT INTO users (username, password, sec_studied, pomodoro_length, short_break_length, long_break_length, credits_spent, todos, purchases) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
    )
      .run([
        username,
        hashedPassword,
        0,
        1500,
        300,
        900,
        0,
        "[]",
        JSON.stringify([defaultTheme]),
      ]);

    return { success: true, id: insert.lastID };
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

export const loginUser = async (db, username, password) => {
  try {
    const row = db.prepare("SELECT * FROM users WHERE username = ?").get(
      username,
    );

    if (!row) {
      throw new Error("User not found");
    }

    const validPassword = await argon2.verify(row.password, password);
    if (!validPassword) {
      throw new Error("Invalid password");
    }

    const token = jwt.sign(
      { id: row.id, username: row.username },
      JWT_SECRET,
      { expiresIn: "24h" },
    );

    return { success: true, token };
  } catch (error) {
    console.error("Error logging in: ", username, " ", error);
    throw error;
  }
};
