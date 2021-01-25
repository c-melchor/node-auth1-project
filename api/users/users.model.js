const db = require("../../data/db-config");

module.exports = {
  getAll() {
    return db("users");
  },
  findBy(filter) {
    return db("users")
      .where(filter)
      .orderBy("id");
  },
  find() {
    return db("users")
      .select("id", "username")
      .orderBy("id");
  },
  async add(user) {
    return await db("users")
      .insert(user)
      .then(id => {
        return db("users")
          .where("id", id)
          .first();
      });
  },
  findById(id) {
    return db("users")
      .where({ id })
      .first();
  }
};
