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
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
  },



};
