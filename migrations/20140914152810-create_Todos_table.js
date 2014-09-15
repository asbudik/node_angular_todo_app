module.exports = {
  up: function(migration, DataTypes, done) {
    // add altering commands here, calling 'done' when finished
    migration.createTable('tasks',
      {id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
      title: {
        type: DataTypes.STRING,
          allowNull: false,
        },
      description: {
        type: DataTypes.STRING,
        allowNull: false
      },
      complete: {
        type: DataTypes.INTEGER
      }
    })
    .complete(done);
  },
  down: function(migration, DataTypes, done) {
    // add reverting commands here, calling 'done' when finished

    migration.dropTable('tasks')
      .complete(done);
  }
};
