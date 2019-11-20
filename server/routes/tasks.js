const { Task, validate } = require("../models/task");
const { Category } = require("../models/category");
const express = require("express");
const router = express.Router();

router.get("/:categoryId", async (req, res) => {
  const category = await Category.findById(req.params.categoryId);
  if (!category) {
    return res.status(404).send("The category with the given id was not found");
  }
  console.log(category.tasks);
  res.send(category.tasks);
});

router.get("/:categoryId/:taskId", async (req, res) => {
  const category = await Category.findById(req.params.categoryId);
  if (!category) {
    return res.status(404).send("The category with the given id was not found");
  }
  const task = category.tasks.find(t => t._id.toString() === req.params.taskId);
  if (!task) {
    res.status(404).send("The task with the given id was not found");
  }
  res.send(task);
});

module.exports = router;
