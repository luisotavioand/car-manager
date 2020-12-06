import Knex from 'knex';
import * as bcrypt from 'bcrypt';

export async function seed (knex: Knex) {
    await knex('user').insert({
        username: 'Adm',
        password: await bcrypt.hash('123', 8),
        email:'adm@gmail.com'
    });
}