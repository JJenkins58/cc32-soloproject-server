const accountModel = require("./account-model");
const crypto = require("crypto");
const express = require("express");
const app = express();

app.get('/', function(req, res, next) {
    res.send("Hello World from account controller")
})

module.exports = {
    async login(req, res) {
        try {
            const inputUsername = req.body.username;
            const inputPassword = req.body.password;
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
            const username = req.body.username;
            const password = req.body.password;
            const email = req.body.email;
            const firstName = req.body.firstName;
            const lastName = req.body.lastName;
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
                email: email,
                salt: salt,
                firstName: firstName,
                lastName: lastName,
            };

            await accountModel.createNewAccount(newAccountData);
            res.status(201).send("Account Registered");
        } catch (error) {
            res.status(409).send(`Failed to create account: ${error.message}`);
        }
    },
};