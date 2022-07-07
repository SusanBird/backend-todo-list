const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const Todo = require('../models/Todo');
// const authorizeTodo = require('../middleware/authorizeTodo');


module.exports = Router()
  .get('/', authenticate, async (req, res, next) => {
    try {
      const todoInfo = await Todo.getAll(req.user.id);
      res.json(todoInfo);
    } catch (e) {
      next(e);
    }
  })

  .post('/', authenticate, async (req, res, next) => {
    try {
      const todo = await Todo.insert({ ...req.body, user_id: req.user.id });
      res.json(todo);
    } catch (e) {
      next(e);
    }
  })

  .put('/:id', authenticate, async (req, res, next) => {
    try {
      const item = await Todo.updateById(req.params.id, req.body);
      res.json(item);
    } catch (e) {
      next(e);
    }
  })

  .delete('/:id', authenticate, async (req, res, next) => {
    try {
      const data = await Todo.delete(req.params.id);
      res.json(data);
    } catch (e) {
      next(e);
    }
  });
