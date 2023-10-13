const express = require("express");
const studentRouter = require("./routes/students");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/students", studentRouter);

app.listen(3003, () => {
  console.log("listening");
});
