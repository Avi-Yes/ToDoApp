const Joi = require("joi");
const mongoose = require("mongoose");
const { taskSchema } = require("./task");

const Category = mongoose.model(
  "Category",
  new mongoose.Schema({
    name: {
      type: String,
      require: true,
      minlength: 2,
      maxlength: 100
    },
    tasks: [taskSchema]
  })
);

function validateCategory(category) {
  const schema = {
    name: Joi.string()
      .min(1)
      .required()
  };

  return Joi.validate(category, schema);
}

module.exports.Category = Category;
module.exports.validateCategory = validateCategory;
