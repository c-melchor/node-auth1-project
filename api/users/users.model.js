const db = require("../../data/db-config");

module.exports = {
  getAll() {
    return db("users");
  },
  async add(user) {
    return await db("users")
      .insert(user)
      .then(id => {
        return db("users")
          .where("id", id)
          .first();
      });
  }
};
