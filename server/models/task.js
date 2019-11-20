const Joi = require("joi");
const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
    minlength: 1,
    maxlength: 100
  },
  notes: {
    type: String,
    maxlength: 300
  },
  creationDate: {
    type: Date,
    default: Date.now()
  }
});

const Task = mongoose.model("task", taskSchema);

function validateTask(task) {
  const schema = {
    title: Joi.string()
      .min(1)
      .required()
      .max(100),
    notes: Joi.string().max(300)
  };

  return Joi.validate(task, schema);
}

module.exports.Task = Task;
module.exports.taskSchema = taskSchema;
module.exports.validateTask = validateTask;
