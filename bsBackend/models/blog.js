module.exports = (sequelize, DataTypes) => {
  const Blog = sequelize.define('Blog', {
    blog_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    summary: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_featured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {
    tableName: 'Blogs',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });

  Blog.associate = (models) => {
    Blog.belongsTo(models.User, { foreignKey: 'user_id' });
    Blog.hasMany(models.Comment, { foreignKey: 'blog_id' });
    Blog.belongsToMany(models.Category, {
      through: models.BlogCategory,
      foreignKey: 'blog_id',
    });
  };

  return Blog;
};
