/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('deals', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		account_name: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		account_bank: {
			type: DataTypes.STRING(45),
			allowNull: true
		},
		account_number: {
			type: DataTypes.STRING(45),
			allowNull: false,
			unique: true
		},
		estimates_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		safe_deals: {
			type: DataTypes.STRING(45),
			allowNull: true
		},
		deal_dates: {
			type: DataTypes.DATE,
			allowNull: true
		}
	}, {
		tableName: 'deals'
	});
};
