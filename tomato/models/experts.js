/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {

  let experts = sequelize.define('experts', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
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
    service: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    area: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    movable_distance: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    gender: {
      type: DataTypes.STRING(1),
      allowNull: false
    },
    authentication: {
      type: DataTypes.STRING(1),
      allowNull: false,
      defaultValue: '0'
    },
    contact_start_time: {
      type: DataTypes.INTEGER(2),
      allowNull: true
    },
    contact_end_time: {
      type: DataTypes.INTEGER(2),
      allowNull: true
    },
    method_of_payment: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    career: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    number_of_employees: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    business_registration: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    certificate: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    all_service: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    service_description: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    homepage: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    facebook: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    twitter: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    instagram: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    blog: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    kakao_story: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    login_time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    is_exposed: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    one_line_description: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    account_number: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    account_bank: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    account_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    profile_photo: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    video_and_picture: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    certificate_photo: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    business_registration_photo: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'experts'
  });

  experts.associate = function(models) {
    experts.hasMany(models.estimates, {
      foreignKey: 'experts_id',
      sourceKey: 'id'
    });
    experts.hasMany(models.reviews, {
      foreignKey: 'experts_id',
      sourceKey: 'id'
    });
    experts.hasMany(models.chats, {
      foreignKey: 'experts_id',
      sourceKey: 'id'
    });

  };

  return experts;

};
