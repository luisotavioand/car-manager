import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('branch', table => {
        table.increments('id_branch');
        table.string('name', 40).notNullable();
        table.string('country', 40).notNullable();
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('branch');
}