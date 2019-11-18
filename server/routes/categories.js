const { Category, validate } = require("../models/category");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

// const Category = mongoose.model(
//   "Categories",
//   new mongoose.Schema({
//     name: {
//       type: String,
//       require: true,
//       minlength: 2,
//       maxlength: 255
//     }
//   })
// );

router.get("/", async (req, res) => {
  const categories = await Category.find();
  res.send(categories);
});

/**api/categories/:id */
router.get("/:id", async (req, res) => {
  const category = await Category.findById(id);

  if (!category) {
    res.status(404).send("The category with the given id was not found");
  }

  res.send(category);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);

  if (error) return res.status(404).send(error.details[0].message);

  let category = new Category({ name: req.body.name });
  category = await category.save();

  res.send(category);
});

router.delete("/:id", async (req, res) => {
  const category = await Category.findOneAndRemove(id);

  if (!category) {
    res.status(404).send("The category with the given id was not found");
  }

  res.send(category);
});

module.exports = router;
