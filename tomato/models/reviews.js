/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	let reviews = sequelize.define('reviews', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		score: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		review: {
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
		tableName: 'reviews'
	});

	reviews.associate = function(models) {
		reviews.belongsTo(models.users, {foreignKey:'users_id', targetKey:'id'});
		reviews.belongsTo(models.experts, {foreignKey: 'experts_id', targetKey: 'id'});
	}

	return reviews;
};
