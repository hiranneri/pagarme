module.exports = {  
    client: 'pg',
    connection: {
      database: process.env.BANCO_DATABASE || 'PagarMe',
      user: process.env.BANCO_USER || 'postgres',
      password: process.env.BANCO_PASSWORD || '123',
      port: process.env.BANCO_PORT || '5432',
      host: process.env.BANCO_HOST || 'localhost'
      
    },
    migrations:{
      directory: `${__dirname}/database/migrations`,
      tableName: 'knex_migrations',
    },
    seeds:{
      directory:`${__dirname}/database/seeds`
    }  
};