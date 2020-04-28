/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	let categories = sequelize.define('categories', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		request_count: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			defaultValue: '0'
		},
		expert_count: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			defaultValue: '0'
		},
		review_count: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			defaultValue: '0'
		},
		category: {
			type: DataTypes.STRING(45),
			allowNull: true
		},
		division: {
			type: DataTypes.STRING(45),
			allowNull: true
		},
		section: {
			type: DataTypes.STRING(45),
			allowNull: true
		},
		comment: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		section_photo: {
			type: DataTypes.STRING(255),
			allowNull: true
		}
	}, {
		tableName: 'categories'
	});


	categories.associate = function(models) {
		categories.hasMany(models.questions, {foreignKey: 'categories_id',
		sourceKey : 'id'});

	}


	return categories;
};
