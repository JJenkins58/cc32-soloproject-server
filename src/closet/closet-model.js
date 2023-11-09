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

    createNewItem(newItemData) {
        return knex("closet").insert({
            itemName: newItemData.itemName,
            category: newItemData.category,
            item_picture: newItemData.item_picture,
        });
    },

    deleteItem(numId) {
        return knex("closet").where('id', '=', numId).del();
    },
}