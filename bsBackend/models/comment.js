module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    comment_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    blog_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, {
    tableName: 'Comments',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });

  Comment.associate = (models) => {
    Comment.belongsTo(models.Blog, { foreignKey: 'blog_id' });
    Comment.belongsTo(models.User, { foreignKey: 'user_id' });
  };

  return Comment;
};
