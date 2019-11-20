const express = require("express");
const Joi = require("joi");
const categories = require("./routes/categories");
const tasks = require("./routes/tasks");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/todoapp", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch(() => console.log("Could not connect to Mongodb", err));

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   next();
// });
app.use(cors());
app.use(express.json());
app.use("/api/categories", categories);
app.use("/api/tasks", tasks);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
