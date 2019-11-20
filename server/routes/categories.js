const { Category, validateCategory } = require("../models/category");
const { Task, validateTask } = require("../models/task");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const categories = await Category.find();
  res.send(categories);
});

router.get("/tasks", async (req, res) => {
  console.log("categories/tasks");
  const categories = await Category.find();
  let tasks = [];
  categories.forEach(category => {
    tasks = tasks.concat(category.tasks);
  });

  res.send(tasks);
});

router.get("/:categoryId/tasks/:taskId", async (req, res) => {
  const category = await Category.findById(req.params.categoryId);

  if (!category) {
    res.status(404).send("The category with the given id was not found");
  }

  const task = category.tasks.find(t => t._id.toString() === req.params.taskId);
  if (!task) {
    res.status(404).send("The task with the given id was not found");
  }
  res.send(task);
});

router.delete("/:categoryId/tasks/:taskId", async (req, res) => {
  const category = await Category.findById(req.params.categoryId);

  if (!category) {
    res.status(404).send("The category with the given id was not found");
  }

  const task = category.tasks.id(req.params.taskId);
  task.remove();
  category.save();
  res.send(task);
});

/**api/categories/:id */
router.get("/:id", async (req, res) => {
  console.log("categories/:id");
  const category = await Category.findById(req.params.id);

  if (!category) {
    res.status(404).send("The category with the given id was not found");
  }

  res.send(category);
});

router.post("/", async (req, res) => {
  const { error } = validateCategory(req.body);

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

router.post("/:categoryId/tasks", async (req, res) => {
  const { error } = validateTask(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  const category = await Category.findById(req.params.categoryId);
  if (!category) {
    res.status(404).send("The category with the given id was not found");
  }

  const task = new Task({ title: req.body.title, notes: req.body.notes });
  category.tasks.push(task);
  category.save();

  res.send(category);
});

module.exports = router;
