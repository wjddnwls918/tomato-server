/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
  let requests = sequelize.define('requests', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    answer: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    section: {
      type: DataTypes.STRING(255),
      allowNull: true
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
    request_state: {
      type: DataTypes.STRING(1),
      allowNull: false,
      defaultValue: '0'
    },
    is_receive: {
      type: DataTypes.STRING(1),
      allowNull: false,
      defaultValue: '0'
    },
    date_time_request: {
      type: DataTypes.DATE,
      allowNull: true
    },
    budget_type: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    budget: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    questions_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'questions',
        key: 'id'
      }
    }
  }, {
    tableName: 'requests'
  });

  requests.associate = function(models) {
    requests.belongsTo(models.users, {
      foreignKey: 'users_id',
      targetKey: 'id'
    });
    requests.hasMany(models.estimates, {
      foreignKey: 'requests_id',
      sourceKey: 'id'
    });
    requests.belongsTo(models.questions, {
      foreignKey: 'questions_id',
      targetKey: 'id'
    });
  }

  return requests;

};
