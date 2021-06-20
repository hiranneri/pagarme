let enviroment = process.env.NODE_ENV || 'development';

const knexfile = require('../knexfile')
const knex = require('knex')(knexfile)
//const config = require('../knexfile')[enviroment]
module.exports = knex