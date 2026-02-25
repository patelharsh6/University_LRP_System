const studentRoute = require("express").Router();

studentRoute.get("/login", (req, res) => {
    res.send("Student Login");
});

module.exports = studentRoute;