  const { Sequelize }= require('sequelize');
  const sequelize = require("./database");

  
  User = sequelize.define('user', {
    // attributes
    username: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    loggedin: {
      type: Sequelize.BOOLEAN 
  }
  }, {
    // options
  })
  module.exports = User;