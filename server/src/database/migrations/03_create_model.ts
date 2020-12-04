import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('model', table => {
        table.increments('id_model');
        table.string('name', 50).notNullable();
        table.integer('initial_year', 4).notNullable();
        table.integer('final_year', 4).notNullable();
        table.integer('brand_id')
            .references('id_brand')
            .inTable('brand')
            .notNullable()
            .unsigned()
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('model');
}