const knex = require("../knex");

module.exports = {
    getAll() {
        return knex
        .select("*")
        .from("closet")
    },

    getById(id) {
        return knex
        .select("*")
        .from("closet")
        .where({id:id})
        .first();
    },

    create(item) {
        return knex("closet")
        .insert([item]);
    },

    update(id, item) {
        return knex("")
    }
}