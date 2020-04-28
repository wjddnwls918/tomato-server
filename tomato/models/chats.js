/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
  let chats = sequelize.define('chats', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    user_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    messages: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    input_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    users_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    experts_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'experts',
        key: 'id'
      }
    }
  }, {
    tableName: 'chats'
  });

  chats.associate = function(models) {
    chats.belongsTo(models.users, {
      foreignKey: 'users_id',
      targetKey: 'id'
    });
    chats.belongsTo(models.experts, {
      foreignKey: 'experts_id',
      targetKey: 'id'
    });
  }

  return chats;
};
