const express = require("express");
const router = express.Router();

const lists = [
  { _id: "5b21ca3eeb7f6fbccd471818", name: "Personal" },
  { _id: "5b21ca3eeb7f6fbccd471814", name: "Shooping List" },
  { _id: "5b21ca3eeb7f6fbccd471820", name: "Work" }
];

router.get("/", (req, res) => {
  res.send(lists);
});

router.post("/api/lists", (req, res) => {
  const { error } = validateList(req.body);
  if (error) return res.status(404).send(error.details[0].message);
  const list = {
    id: lists.length + 1,
    name: req.body.name
  };

  lists.push(list);
  res.send(list);
});

router.get("/api/lists/:id", (req, res) => {
  const list = list.find(l => l.id === parseInt(req.params._id));
  if (!list) {
    res.status(404).send("The list with the given id was not found");
  }

  res.send(list);
});

router.delete("/api/lists/:id", (req, res) => {
  const list = list.find(l => l.id === parseInt(req.params._id));
  if (!list) {
    res.status(404).send("The list with the given id was not found");
  }

  const index = lists.indexOf(list);
  lists.splice(index, 1);
  res.send(lists);
});

function validateList(list) {
  const schema = {
    name: Joi.string()
      .min(1)
      .required()
  };

  return Joi.validate(list, schema);
}

module.exports = router;
