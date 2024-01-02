const bcrypt = require("bcrypt");

module.exports = (sequelize, Sequelize) => {
  const Chat = sequelize.define("chat", {
    content: {
      type: Sequelize.STRING,
      allowNull: false,
    },
     createdAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
    updatedAt: {
      type: Sequelize.DATE,
    },
  });



  return Chat;
};
