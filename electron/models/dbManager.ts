const sqlite3 = require("sqlite3");
const db = new sqlite3.Database("./electron/models/tasks.db");

db.run(`CREATE TABLE IF NOT EXISTS myTable(task String)`);

export const insertData = (task: string) => {
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

export const fetchData = (callback: (records: any) => void) => {
  const fetchQuery = `SELECT * FROM myTable`;
  db.all(fetchQuery, [], (err: Error | null, records: any) => {
    if (err) {
      console.log(err);
      return;
    }
    const recordsOfString = records.map((item: any) => item.task);
    callback(recordsOfString);
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
