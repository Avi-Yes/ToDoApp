import * as listAPI from "./fakeListService";

const tasks = [
  {
    _id: "5b21ca3eeb7f6fbccd471815",
    title: "pay bills",
    list: { _id: "5b21ca3eeb7f6fbccd471818", name: "Personal" }
  },
  {
    _id: "5b21ca3eeb7f6fbccd471816",
    title: "take out the dog",
    list: { _id: "5b21ca3eeb7f6fbccd471818", name: "Personal" }
  },
  {
    _id: "5b21ca3eeb7f6fbccd471817",
    title: "fix the car",
    list: { _id: "5b21ca3eeb7f6fbccd471820", name: "Personal" }
  },
  {
    _id: "5b21ca3eeb7f6fbccd471819",
    title: "milk",
    list: { _id: "5b21ca3eeb7f6fbccd471814", name: "Shooping List" }
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181a",
    title: "sugar",
    list: { _id: "5b21ca3eeb7f6fbccd471814", name: "Shooping List" }
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181b",
    title: "coffee",
    list: { _id: "5b21ca3eeb7f6fbccd471814", name: "Shooping List" }
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181e",
    title: "send mail to",
    list: { _id: "5b21ca3eeb7f6fbccd471820", name: "Work" }
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181f",
    title: "replace the battries in the keyboard",
    list: { _id: "5b21ca3eeb7f6fbccd471820", name: "Work" }
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
  taskInDb.list = listAPI.lists.find(l => l._id === task.listId);

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
