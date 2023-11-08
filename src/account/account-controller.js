const accountModel = require("./account-model");
const crypto = require("crypto");
const session = require("express-session");
const express = require("express");
const app = express();

app.get('/', function(req, res, next) {
    res.send("Hello World from account controller")
})

function generateSessionToken() {
    return crypto.randomBytes(16).toString("hex");
}

module.exports = {
    async login(req, res) {
        try {
            const { username: inputUsername, password: inputPassword } = req.body;
            const accountData = await accountModel.getDataByUsername(inputUsername);

            if(!accountData) {
                throw new Error();
            }

            const saltedInputPassword = accountData.salt + inputPassword;
            const hash = crypto.createHash("sha256");
            const hashSaltedInputPassword = hash.update(saltedInputPassword).digest("hex");

            if(hashSaltedInputPassword !== accountData.hash_salted_password) {
                throw new Error();
            }
            console.log("sentaccountdata",sentAccountData)
            const sentAccountData = {
                accountID: accountData.id,
                username: accountData.username,
            }

            res.status(200).send(JSON.stringify(sentAccountData));
        }

        catch (err) {
            res.status(401).send("Invalid username or password.");
        }
    },

    async createNewAccount(req, res) {
        try {
            const { username, password, email, firstName, lastName } = req.body;
            const accountDataByUsername = await accountModel.getDataByUsername(username);
            const accountDataByEmail = await accountModel.getDataByEmail(email);

            if (accountDataByUsername) {
                throw new Error("Username already exists");
            }

            if(accountDataByEmail) {
                throw new Error("Email already exists");
            }

            const salt = crypto.randomBytes(6).toString("hex");
            const saltedPassword = salt + password;

            const hash = crypto.createHash("sha256");
            const hashSaltedPassword = hash.update(saltedPassword).digest("hex");

            const newAccountData = {
                username: username,
                hashSaltedPassword: hashSaltedPassword,
                salt: salt,
                firstName: firstName,
                lastName: lastName,
            };

            await accountModel.createNewAccountAccount(newAccountData);
            res.status(201).send("Account Registered");
        } catch (error) {
            res.status(409).send(`Failed to create account: ${error.message}`);
        }
    },
};