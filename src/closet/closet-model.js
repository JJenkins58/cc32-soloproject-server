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
        .where({
            userId: id.userId,
        });
    },

    createNewItem(newItemData) {
        return knex("closet").insert({
            userId: newItemData.userId,
            itemName: newItemData.itemName,
            category: newItemData.category,
            item_picture: newItemData.item_picture,
        });
    },

    deleteItem(numId) {
        return knex("closet").where('id', '=', numId).del();
    },

    updateItem(itemData) {
        return knex("closet").where({
            id: itemData.id,
        })
        .update({
            itemName: itemData.itemName,
            category: itemData.category,
        })
    }
}