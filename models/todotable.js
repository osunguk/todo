'use strict';
module.exports = (sequelize, DataTypes) => {
  const todoTable = sequelize.define('todoTable', {
    tableName: DataTypes.STRING,
    uid: DataTypes.INTEGER
  }, {});
  todoTable.associate = function(models) {
    // associations can be defined here
    models.todoTable.belongsTo(models.user, {
      foreignKey: "uid",
      ad : 'userId'
    })

    models.todoTable.hasMany(mode.todoEntry)
  };
  return todoTable;
};