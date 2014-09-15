

module.exports = function (sequelize, DataTypes) {
  var Task = sequelize.define('task', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    complete: DataTypes.INTEGER
  })
  return Task;
};