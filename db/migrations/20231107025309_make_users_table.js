const { table } = require("console");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("account", (table) => {
    table.increments("id").primary();
    table.string("username", 255).unique;
    table.string("hash_salted_password", 255);
    table.string("salt", 255);
    table.string("email", 255).unique;
    table.string("first_name", 255);
    table.string("last_name", 255);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("account");
};
