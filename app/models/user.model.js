const bcrypt = require("bcrypt");

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    name: {
      type: Sequelize.STRING,
      allowNull: false, // Assuming a name is required
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false, // Assuming an email is required
      unique: true, // Assuming email should be unique
      validate: {
        isEmail: true, // Add email validation if needed
      },
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false, // Assuming a password is required
    },
    createdAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW, // Use Sequelize's NOW to set the current date/time by default
    },
    city: {
      type: Sequelize.STRING,
    },
    published: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    }
  });

  User.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };

  return User;
};
