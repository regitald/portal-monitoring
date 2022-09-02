const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('permissions', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    menu_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'menu',
        key: 'id'
      }
    },
    view: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue:false
    },
    create: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue:false
    },
    edit: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue:false
    },
    delete: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue:false
    },
    detail: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue:false
    }
  }, {
    sequelize,
    tableName: 'permissions',
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
    paranoid: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "menu_id",
        using: "BTREE",
        fields: [
          { name: "menu_id" },
        ]
      },
    ]
  });
};
