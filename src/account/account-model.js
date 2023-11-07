const knex = require("../knex");

module.exports = {
    getDataByUsername(username) {
        return knex('account').where({ username: username }).first()
    },

    getDataByEmail(email) {
        return knex('account').where({ email: email }).first()
    },

    createNewAccount(account) {
        return knex('account').insert({
            username: account.username,
            hash_salted_password: account.hash_salted_password,
            salt: account.salt,
            email: account.email,
            first_name: account.firstName,
            last_name: account.lastName,
        });
    }
}