//Lấy model dữ liệ từ bảng user trong cơ sở dữ liệu
const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
    id_user: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name_user: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    date_of_birth: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    address: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    date_created: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    date_updated: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    role_user: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    username: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: true,
      //is: /^[0-9a-f]{64}$/i
    }
  }, {
    sequelize,
    tableName: 'users',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_user" },
        ]
      },
    ]
  });
};
