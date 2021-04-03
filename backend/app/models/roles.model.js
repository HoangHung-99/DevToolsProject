// lấy model dữ liệu từ bảng role trong cơ sở dữ liệu
const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('roles', {
    //id_role
    id_role: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    //tên role
    name_role: {
      type: DataTypes.STRING(45),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'roles',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_role" },
        ]
      },
    ]
  });
};
