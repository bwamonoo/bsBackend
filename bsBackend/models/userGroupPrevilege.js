module.exports = (sequelize, DataTypes) => {
  const UserGroupPrevilege = sequelize.define('UserGroupPrevilege', {
    userGroup_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    previlge_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
  }, {
    tableName: 'UserGroupPrevileges',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });

  return UserGroupPrevilege;
};
