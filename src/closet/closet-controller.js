const closetModel = require("./closet-model");
const model = require("./closet-model");

module.exports = {
    async index(req, res) {
        const items = await model.getAll();
        return items;
    },

    async view(req, res) {
        const id = parseInt(req.body.userId);
        const items = await model.getById(id);
        console.log("items",items)
        return items;  
    },

    async createNewItem(req, res) {
        try {
            const userId = req.body.userId;
            const itemName = req.body.itemName;
            const category = req.body.category;
            const item_picture = req.body.item_picture;
            
            const newItemData = {
                userId: userId,
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
    
    async deleteItem(req, res) {
        try {
            const id = req.params.id;
            const numId = Number(id);
            await closetModel.deleteItem(numId);
            res.status(201).send("Item Deleted");
        } catch (error) {
            res.status(409).send(`Failed to delete item: ${error.message}`);
        }
    },

    async updateItem(req, res) {
        try {
            const id = req.body.id;
            const userId = req.body.userId;
            const itemName = req.body.itemName;
            const category = req.body.category;
            const item_picture = req.body.item_picture;

            const itemData = {
                id: id,
                userId: userId,
                itemName: itemName,
                category: category,
                item_picture: item_picture,
            };
            console.log("itemdata:", itemData)
            await closetModel.updateItem(itemData);
            res.status(201).send("Item Updated");

        } catch (error) {}
    }
}