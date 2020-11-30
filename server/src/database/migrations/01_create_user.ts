import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('user', table => {
        table.increments('id_user');
        table.string('username', 45).notNullable().unique();
        table.string('email', 50).notNullable().unique();
        table.string('password').notNullable();
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('user');
}