'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    salt: DataTypes.STRING,
    email: DataTypes.STRING,
    tid: DataTypes.INTEGER
  }, {});
  user.associate = function(models) {
    // associations can be defined here
    user.hasOne(models.todoTable, {
      foreignKey: 'tid',
      ad: 'tableId'
    })
  };
  return user;
};