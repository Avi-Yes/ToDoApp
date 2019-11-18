import * as categoryAPI from "./fakeListService";

const tasks = [
  {
    _id: "5b21ca3eeb7f6fbccd471815",
    title: "pay bills",
    category: { _id: "5b21ca3eeb7f6fbccd471818", name: "Personal" }
  },
  {
    _id: "5b21ca3eeb7f6fbccd471816",
    title: "take out the dog",
    category: { _id: "5b21ca3eeb7f6fbccd471818", name: "Personal" }
  },
  {
    _id: "5b21ca3eeb7f6fbccd471817",
    title: "fix the car",
    category: { _id: "5b21ca3eeb7f6fbccd471820", name: "Personal" }
  },
  {
    _id: "5b21ca3eeb7f6fbccd471819",
    title: "milk",
    category: { _id: "5b21ca3eeb7f6fbccd471814", name: "Shooping List" }
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181a",
    title: "sugar",
    category: { _id: "5b21ca3eeb7f6fbccd471814", name: "Shooping List" }
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181b",
    title: "coffee",
    category: { _id: "5b21ca3eeb7f6fbccd471814", name: "Shooping List" }
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181e",
    title: "send mail to",
    category: { _id: "5b21ca3eeb7f6fbccd471820", name: "Work" }
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181f",
    title: "replace the battries in the keyboard",
    category: { _id: "5b21ca3eeb7f6fbccd471820", name: "Work" }
  }
];

export function getTasks() {
  return tasks;
}

export function getTask(id) {
  return tasks.find(t => t._id === id);
}

export function saveTask(task) {
  let taskInDb = tasks.find(t => t._id === task._id) || {};
  taskInDb.name = task.name;
  taskInDb.category = categoryAPI.getLists.find(l => l._id === task.categoryId);

  if (!taskInDb._id) {
    taskInDb._id = Date.now();
    tasks.push(taskInDb);
  }

  return taskInDb;
}

export function deleteTask(id) {
  let taskInDb = tasks.find(t => t._id === id);
  tasks.splice(tasks.indexOf(taskInDb), 1);
  return taskInDb;
}
