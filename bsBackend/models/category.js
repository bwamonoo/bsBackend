module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    category_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
  }, {
    tableName: 'Categories',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });

  Category.associate = (models) => {
    Category.belongsToMany(models.Blog, {
      through: models.BlogCategory,
      foreignKey: 'category_id',
    });
  };

  return Category;
};
