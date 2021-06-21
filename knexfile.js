module.exports = {  
    client: 'pg',
    connection: {
      database: process.env.BANCO_DATABASE,
      user: process.env.BANCO_USER,
      password: process.env.BANCO_PASSWORD,
      port: process.env.BANCO_PORT,
      host: process.env.HOST
      
    },
    migrations:{
      directory: `${__dirname}/src/database/migrations`,
      tableName: 'knex_migrations',
    },
    seeds:{
      directory:`${__dirname}/src/database/seeds`
    }  
};