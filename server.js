const express = require('express');
const app = express();
const cors = require("cors");

const accountController = require("./src/account/account-controller");
const closetController = require('./src/closet/closet-controller');

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

app.listen(PORT, () => console.log(`server is listening on port ${PORT}`));

app.get("/hello", (req, res) => {
    const helloWorld = "Hello World from server";
    res.status(200).send(JSON.stringify(helloWorld));
});

app.post("/register", accountController.createNewAccount);

app.post("/login", accountController.login);

app.get("/items", async (req, res) => {
    const items = await closetController.index();
    res.status(200).send(JSON.stringify(items));
});

app.post("/additems", closetController.createNewItem);

