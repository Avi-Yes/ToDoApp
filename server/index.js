const express = require("express");
const Joi = require("joi");
const lists = require("./routes/lists");
const cors = require("cors");
const app = express();

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   next();
// });
app.use(cors());
app.use(express.json());

app.use("/api/lists", lists);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
