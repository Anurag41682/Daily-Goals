const sqlite3 = require("sqlite3");
const db = new sqlite3.Database("./electron/models/tasks.db");

db.run(
  `CREATE TABLE IF NOT EXISTS myTable(id TEXT ,task TEXT ,isMarked INTEGER)`
);

function generateUniqueId() {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

export const insertData = (task: string, callback: any) => {
  const id = generateUniqueId();
  const isMarked = false;
  const insertQuery = `
    INSERT INTO myTable (id, task, isMarked)
    VALUES (?,?,?)
  `;

  db.run(insertQuery, [id, task, isMarked], function (err: Error | null) {
    if (err) {
      console.error(err.message);
      return;
    }
    callback(null, { id, task, isMarked });
  });
};

export const fetchData = (callback: (records: any) => void) => {
  const fetchQuery = `SELECT * FROM myTable`;
  db.all(fetchQuery, [], (err: Error | null, records: any) => {
    if (err) {
      console.log(err);
      return;
    }
    callback(records);
  });
};

export const clearData = () => {
  const clearQuery = `DELETE FROM myTable`;
  db.run(clearQuery, [], (err: Error | null) => {
    if (err) {
      console.log(err);
      return;
    }
  });
};

export const markUnmark = (id: string) => {
  const markUnmarkQuery = `UPDATE myTable SET isMarked = NOT isMarked WHERE id = ?`;
  db.run(markUnmarkQuery, [id], function (err: Error | null) {
    if (err) {
      console.error("Error toggling isMarked:", err.message);
      return;
    }
  });
};
