import Database from "better-sqlite3";

function initDB() {
  const db = new Database("./database.db");
  // Initialize your tables
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      password TEXT,
	  mins_studied INTEGER,
	  pomodoro_length INTEGER,
	  short_break_length INTEGER,
	  long_break_length INTEGER
    )
  `);

  return db;
}

const attachDB = (db) => (req, res, next) => {
  req.db = db;
  next();
};

export { attachDB, initDB };
