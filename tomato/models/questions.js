/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
  let questions = sequelize.define('questions', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    categories_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'categories',
        key: 'id'
      }
    },
    question_number: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    question_contents: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    choice_contents: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    tableName: 'questions'
  });

  questions.associate = function(models) {
    questions.hasMany(models.requests, {
      foreignKey: 'questions_id',
      sourceKey: 'id'
    });

    questions.belongsTo(models.categories, {
      foreignKey: 'categories_id',
      targetKey: 'id'
    });
  }

  return questions;

};
