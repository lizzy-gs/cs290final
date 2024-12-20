import process from "node:process";
import { loginUser, registerUser } from "../auth.js";
export const post = async (req, res) => {
  try {
    await registerUser(req.db, req.body.username, req.body.password);
  } catch (error) {
    if (error.message == "UNIQUE constraint failed: users.username") {
      error.message = "Username already taken.";
    }
    res.render("account", {
      title: "Register",
      login: false,
      error: error.message,
    });
    return;
  }

  const result = await loginUser(req.db, req.body.username, req.body.password);

  // Set secure cookie with JWT token
  res.cookie("session", result.token, {
    httpOnly: true, // Prevents JavaScript access to cookie
    secure: process.env.NODE_ENV === "production", // Requires HTTPS in production
    sameSite: "strict", // CSRF protection
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  });

  res.redirect(302, "/");
};

export const get = (req, res) => {
  res.render("account", { title: "Register", login: false });
};
