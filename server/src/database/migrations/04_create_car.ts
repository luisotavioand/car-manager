import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('car', table => {
        table.increments('id_car');
        table.string('license_plate', 15).notNullable();
        table.string('category', 60).notNullable();
        table.string('renavan', 30).notNullable();
        table.string('proprietary_name', 30).notNullable();
        table.string('proprietary_document', 20).notNullable();
        table.text('note');
        table.integer('model_id')
            .references('id_model')
            .inTable('model')
            .notNullable()
            .unsigned()
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
        table.integer('user_id')
            .references('id_user')
            .inTable('user')
            .notNullable()
            .unsigned()
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('car');
}