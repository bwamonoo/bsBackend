module.exports = (sequelize, DataTypes) => {
  const Previlege = sequelize.define('Previlege', {
    previlege_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    previlege_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'Previleges',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });

  Previlege.associate = (models) => {
    Previlege.belongsToMany(models.UserGroup, {
      through: models.UserGroupPrevilege,
      foreignKey: 'previlege_id',
    });
  };

  return Previlege;
};
