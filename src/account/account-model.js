const knex = require("../knex");

module.exports = {
    getDataByUsername(username) {
        return knex('account').where({ username: username }).first()
    },

    getDataByEmail(email) {
        return knex('account').where({ email: email }).first()
    },

    createNewAccount(newAccountData) {
        return knex('account').insert({
            username: newAccountData.username,
            hash_salted_password: newAccountData.hashSaltedPassword,
            salt: newAccountData.salt,
            email: newAccountData.email,
            first_name: newAccountData.firstName,
            last_name: newAccountData.lastName,
        });
    }
}