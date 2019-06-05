const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
  todo_description: {
    type: String,
    required: true
  },
  todo_responsible: {
    type: String,
    required: true
  },
  todo_priority: {
    type: String,
    required: true
  },
  todo_completed: {
    type: Boolean
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Todo = mongoose.model("todos", TodoSchema);
