const express = require("express");
const Router = express.Router();
const { db } = require("../db");
const { validateFields } = require("../middleware");

Router.get("/id/:userId", (req, res) => {
  const { userId } = req.params;
  res.send(db.getOneStudent(userId));
});

Router.get("/:userId", (req, res) => {
  const { name, location } = req.query;
  let roster = db;

  if (name) {
    roster = roster.filter((student) => student.name === name);
  }

  if (location) {
    roster = roster.filter((student) => student.location === location);
  }

  res.send(roster);
});

Router.post("/", validateFields, (req, res) => {
  const { name, location } = req.body;
  const newStudent = db.addStudent({ name, location });
  res.send(newStudent);
});

Router.put("/:name", (req, res) => {
  const { name } = req.params;
  const { name: newName, location: newLocation } = req.body;

  if (!newName && !newLocation) {
    return res
      .status(400)
      .json({ error: "Missing new name or location to update with" });
  }

  let hasStudent = false;
  const updatedStudents = [];

  for (const stu of db) {
    if (stu.name === name) {
      hasStudent = true;
    }
    if (newname) {
      stu.name = newName;
    }
  }
  updatedStudents.push(stu);

  if (!hasStudent) {
    return res.status(404).json({ error: `no student with name: ${name}` });
  }
  return res.send(updatedStudents);
});

Router.delete("/:name", (req, res) => {
  const { name } = req.params;

  let stuIdx = db.findIndex((stu) => stu.name === name);
  if (stuIdx === -1) {
    return res.status(404).json({ error: `no student with the name: ${name}` });
  }

  while (stuIdx !== -1) {
    db.splice(stuIdx, 1);
    stuIdx = db.findIndex((stu) => stu.name === name);
  }
  return res.send(db);
});

module.exports = Router;
