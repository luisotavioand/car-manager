import knex from 'knex';

const connection = knex({
    client: 'mysql',
    connection: {
      host : 'localhost',
      user : 'root',
      password : 'masterkey4191',
      database : 'carmanager'
    },
});

export default connection;