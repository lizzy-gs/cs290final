import Database from "better-sqlite3";

function initDB() {
  const db = new Database("./database.db");
  // Initialize your tables
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      password TEXT,
	  sec_studied INTEGER,
	  credits_spent INTEGER,
	  pomodoro_length INTEGER,
	  short_break_length INTEGER,
	  long_break_length INTEGER,
	  todos TEXT,
	  purchases TEXT
    )
  `);

  return db;
}

const attachDB = (db) => (req, res, next) => {
  req.db = db;
  next();
};

export { attachDB, initDB };
