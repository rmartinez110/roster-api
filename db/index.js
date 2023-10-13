const { uid } = require("uid");

class Roster {
  constructor() {}

  addStudent(name, location) {
    const id = uid();
    this[id] = {
      id,
      name,
      location,
    };
    return this[id];
  }

  getOneStudent(id) {
    return this[id];
  }
}

module.exports = {
  db: new Roster(),
};
