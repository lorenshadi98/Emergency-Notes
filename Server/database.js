const Sequelize = require('sequelize');

module.exports = new Sequelize('SteakHolder', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
  logging: (...msg) => console.log(msg)
});
