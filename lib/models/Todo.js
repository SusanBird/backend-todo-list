const pool = require('../utils/pool');

module.exports = class Todo {
  id;
  todo;
  complete;

  constructor(row) {
    this.is = row.id;
    this.todo = row.todo;
    this.complete = row.complete;
  }

  static async insert({ todo, complete }) {
    const { rows } = await pool.query(
      `
      INSERT INTO todos (todo, complete)
      VALUES ($1, $2)
      RETURNING *
    `,
      [todo, complete]
    );

    return new Todo(rows[0]);
  }

};
