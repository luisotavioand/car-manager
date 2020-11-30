import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('model', table => {
        table.increments('id_model');
        table.string('name', 50).notNullable();
        table.integer('initial_year', 4).notNullable();
        table.integer('final_year', 4).notNullable();
        table.integer('branch_id')
            .references('id_branch')
            .inTable('branch')
            .notNullable()
            .unsigned()
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('model');
}