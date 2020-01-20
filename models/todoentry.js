'use strict';
module.exports = (sequelize, DataTypes) => {
  const todoEntry = sequelize.define('todoEntry', {
    tid: DataTypes.INTEGER,
    check: DataTypes.BOOLEAN
  }, {});
  todoEntry.associate = function(models) {
    // associations can be defined here
    models.todoTable.belongsTo(models.todoTable, {
      foreignKey: "tid",
      ad : 'tableId'
    })
  };
  return todoEntry;
};