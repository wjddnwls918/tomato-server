/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
  let estimates = sequelize.define('estimates', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    content: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    cost_type: {
      type: DataTypes.STRING(1),
      allowNull: false
    },
    experts_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'experts',
        key: 'id'
      }
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
    cost: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    is_connected: {
      type: DataTypes.STRING(1),
      allowNull: false,
      defaultValue: '0'
    },
    frequent_request: {
      type: DataTypes.STRING(1),
      allowNull: false,
      defaultValue: '0'
    },
    file_request: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    requests_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    }
  }, {
    tableName: 'estimates'
  });

  estimates.associate = function(models) {
    estimates.belongsTo(models.experts, {
      foreignKey: 'experts_id',
      targetKey: 'id'
    });

		estimates.belongsTo(models.users, {foreignKey:'users_id', targetKey:'id'});


		estimates.belongsTo(models.requests, {foreignKey:'requests_id', targetKey:'id'});
  };

	return estimates;

};
