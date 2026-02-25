const express = require("express");
const studentRoute = require("./routes/studentRoutes");

const app = express();

app.use("/student", studentRoute);

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});

app.get("/", (req, res) => {
  res.send("Hello, World!");
});