const express = require("express");
const router = express.Router();

// Load Todo model
const Todo = require("../../models/Todo");

// list all todo item
router.get("/", (req, res) => {
  Todo.find(function(err, todo) {
    if (err) {
      console.log(err);
    } else {
      res.json({ success: true, Todo: todo });
    }
  });
});

// get todo item by ID
router.get("/:id", function(req, res) {
  let id = req.params.id;
  Todo.finfById(id, function(err, todo) {
    if (err) {
      console.log(err);
    } else {
      res.json({ success: true, Todo: todo });
    }
  });
});

// add todo item
router.post("/add", function(req, res) {
  let todo = new Todo(req.body);
  todo
    .save()
    .then(todo => {
      res.json({ success: true, Todo: "todo added successfully" });
    })
    .catch(err => {
      res.send(err);
    });
});

// update an todo item
router.post("/update/:id", function(req, res) {
  Todo.findById(req, params.id, function(err, todo) {
    if (!todo) {
      res.send("data is not found");
    } else {
      todo.todo_description = req.body.todo_description;
      todo.todo_responsible = req.body.todo_responsible;
      todo.todo_priority = req.body.todo_priority;
      todo.todo_completed = req.body.todo_completed;
      todo
        .save()
        .then(todo => {
          res.json("Todo Updated");
        })
        .catch(err => {
          res.json(err);
        });
    }
  });
});

module.exports = router;
