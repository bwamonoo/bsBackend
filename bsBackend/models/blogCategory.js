module.exports = (sequelize, DataTypes) => {
  const BlogCategory = sequelize.define('BlogCategory', {
    blog_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    category_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
  }, {
    tableName: 'BlogCategories',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });

  return BlogCategory;
};
