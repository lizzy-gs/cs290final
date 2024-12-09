import { loginUser } from "../auth.js";
import process from "node:process";

export const post = async (req, res) => {
  try {
    const { username, password } = req.body;
    const result = await loginUser(req.db, username, password);

    // Set secure cookie with JWT token
    res.cookie("session", result.token, {
      httpOnly: true, // Prevents JavaScript access to cookie
      secure: process.env.NODE_ENV === "production", // Requires HTTPS in production
      sameSite: "strict", // CSRF protection
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    });

    res.redirect(302, "/");
  } catch (error) {
    res.render("account", {
      title: "Log In",
      login: true,
      error: error.message,
    });
  }
};

export const get = (req, res) => {
  res.render("account", { title: "Log In", login: true });
};
