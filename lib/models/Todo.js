const pool = require('../utils/pool');

module.exports = class Todo {
  id;
  todo;
  complete;

  constructor(row) {
    this.id = row.id;
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

  static async updateById(id, attrs) {
    const todoItem = await Todo.getById(id);
    if (!todoItem) return null;
    const { todo, complete } = { ...todoItem, ...attrs };
    const { rows } = await pool.query(
      `
      UPDATE todos 
      SET todo=$2, complete=$3
      WHERE id=$1 RETURNING *`,
      [id, todo, complete]
    );
    return new Todo(rows[0]);
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `
      SELECT *
      FROM todos
      WHERE id=$1
      `,
      [id]
    );
    if (!rows[0]) {
      return null;
    }
    return new Todo(rows[0]);
  }

};
