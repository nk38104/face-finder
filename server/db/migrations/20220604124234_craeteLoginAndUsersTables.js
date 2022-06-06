
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
*/
exports.up = function(knex) {
    return knex.schema
    .createTable("login", table => {
        table.increments("id").primary();
        table.string("email", 128).notNullable().unique();
        table.string("hash").notNullable();
    })
    .createTable("users", table => {
        table.increments("id").primary();
        table.string("username", 64).notNullable().unique();
        table.string("email", 128).notNullable().unique();
        table.string("hash").notNullable();
        table.integer("entries").defaultTo(0);
        table.dateTime("joined");
    });
};


/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
    .dropTable("login")
    .dropTable("users");
};
