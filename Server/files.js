  const { Sequelize }= require('sequelize');
  const sequelize = require("./database");

  
  File = sequelize.define('file', {
    // attributes
    school: {
      type: Sequelize.STRING,
    },
    course: {
      type: Sequelize.STRING
    },
    professor: {
        type: Sequelize.STRING
    },
    filename: {
        type: Sequelize.STRING
    },
    filepath: {
        type: Sequelize.STRING
    },
    username: {
        type: Sequelize.STRING
    },
    reported: {
      type: Sequelize.BOOLEAN
  }
  }, {
    // options
  })
  module.exports = File;