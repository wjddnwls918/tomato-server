/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {

  let users = sequelize.define('users', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true
    },
    phone_number: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    start_alarm_time: {
      type: DataTypes.INTEGER(2),
      allowNull: true
    },
    end_alarm_time: {
      type: DataTypes.INTEGER(2),
      allowNull: true
    },
    profile_photo: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'users'
  });


  users.associate = function(models) {
    users.hasMany(models.reviews, {
      foreignKey: 'users_id',
      sourceKey: 'id'
    });

    users.hasMany(models.requests, {
      foreignKey: 'users_id',
      sourceKey: 'id'
    });

    users.hasMany(models.chats, {
      foreignKey: 'users_id',
      sourceKey: 'id'
    });

		users.hasMany(models.estimates, {foreignKey: 'users_id',
sourceKey : 'id'});


  }

  return users;
};
