// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      database:'PagarMe',
      user:'postgres',
      password: 'docker',
      port:'5433',
      host:'localhost',
      
    },
    migrations:{
      directory: `${__dirname}/src/database/migrations`,
      tableName: 'knex_migrations',
    },
    seeds:{
      directory:`${__dirname}/src/database/seeds`
    }
  },
  

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations:{
      directory: `${__dirname}/src/database/migrations`,
      tableName: 'knex_migrations',
    }
  },
};