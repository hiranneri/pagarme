module.exports = {  
    client: 'pg',
    connection: {
      database:'PagarMe',
      user:'postgres',
      password: '123',
      port:'5432',
      host:'localhost',
      
    },
    migrations:{
      directory: `${__dirname}/src/database/migrations`,
      tableName: 'knex_migrations',
    },
    seeds:{
      directory:`${__dirname}/src/database/seeds`
    }  
};