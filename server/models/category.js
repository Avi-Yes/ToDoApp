const Joi = require("joi");
const mongoose = require("mongoose");

const Category = mongoose.model(
  "Category",
  new mongoose.Schema({
    name: {
      type: String,
      require: true,
      minlength: 2
    }
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
module.exports.validate = validateCategory;
