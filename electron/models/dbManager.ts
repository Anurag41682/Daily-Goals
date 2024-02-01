const sqlite3 = require("sqlite3");
const db = new sqlite3.Database("./electron/models/tasks.db");

db.run(`CREATE TABLE IF NOT EXISTS myTable(task String)`);

export const insertData = (task: String) => {
  const insertQuery = `
    INSERT INTO myTable (task)
    VALUES (?)
  `;

  db.run(insertQuery, [task], function (err: Error | null) {
    if (err) {
      console.error(err.message);
      return;
    }
  });
};
