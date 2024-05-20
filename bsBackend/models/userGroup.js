module.exports = (sequelize, DataTypes) => {
  const UserGroup = sequelize.define('UserGroup', {
    userGroup_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userGroup_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'Roles',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });

  UserGroup.associate = (models) => {
    UserGroup.hasMany(models.User, { foreignKey: 'userGroup_id' });
  };

  return UserGroup;
};
