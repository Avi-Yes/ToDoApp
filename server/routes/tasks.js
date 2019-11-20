const { Task, validate } = require("../models/task");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  //   const tasks = await Task.find();
  res.send("/categories/tasks");
});

router.get("/:id", async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    res.statusCode(404).send("The task with the given id was not found");
  }

  res.send(task);
});

module.exports = router;
