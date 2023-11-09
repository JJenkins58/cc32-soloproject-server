const closetModel = require("./closet-model");
const model = require("./closet-model");

module.exports = {
    async index(req, res) {
        const items = await model.getAll();
        return items;
    },

    async createNewItem(req, res) {
        try {
            const itemName = req.body.itemName;
            const category = req.body.category;
            const item_picture = req.body.item_picture;
            
            const newItemData = {
                itemName: itemName,
                category: category,
                item_picture: item_picture,
            };

            await closetModel.createNewItem(newItemData);
            res.status(201).send("Item Added");
        } catch (error) {
            res.status(409).send(`Failed to add item: ${error.message}`);
        }
    },
}