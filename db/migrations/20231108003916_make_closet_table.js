/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("closet", (table) => {
    table.increments("id").primary();
    table.integer("userId");
    table.string("itemName", 255);
    table.string("category", 255);
    table.binary("item_picture");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("closet");
};
