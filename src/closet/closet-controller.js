const model = require("./closet-model");

module.exports = {
    async index(req, res) {
        const items = await model.getAll();
        return items;
    }
}