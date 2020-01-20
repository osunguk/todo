'use strict';
module.exports = (sequelize, DataTypes) => {
  const todoTable = sequelize.define('todoTable', {
    tableName: DataTypes.STRING
  }, {});
  todoTable.associate = function(models) {
    // associations can be defined here
    todoTable.hasMany(models.user)
  };
  return todoTable;
};