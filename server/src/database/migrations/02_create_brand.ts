import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('brand', table => {
        table.increments('id_brand');
        table.string('name', 40).notNullable();
        table.string('country', 40).notNullable();
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('brand');
}