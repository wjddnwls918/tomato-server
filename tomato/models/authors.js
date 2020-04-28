/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('authors', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true
		},
		first_name: {
			type: DataTypes.STRING(50),
			allowNull: false
		},
		last_name: {
			type: DataTypes.STRING(50),
			allowNull: false
		},
		email: {
			type: DataTypes.STRING(100),
			allowNull: false,
			unique: true
		},
		birthdate: {
			type: DataTypes.DATEONLY,
			allowNull: false
		},
		added: {
			type: DataTypes.STRING(45),
			allowNull: false
		}
	}, {
		tableName: 'authors'
	});
};
