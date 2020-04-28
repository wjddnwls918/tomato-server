/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('salt', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		salt_value: {
			type: DataTypes.STRING(255),
			allowNull: false
		}
	}, {
		tableName: 'salt'
	});
};
