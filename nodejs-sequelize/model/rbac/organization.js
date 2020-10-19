const {DataTypes, Model, Deferrable} = require('sequelize')
const {sequelize} = require('../../conf/db')
const {User} = require('./user')

class Organization extends Model {}

Organization.init({
    // attributes
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: DataTypes.STRING,
        defaultValue: 'customer'
    },
    pid: {
      type: DataTypes.INTEGER,
    }
}, {
  sequelize,
  modelName: 'organization',
  tableName: 'organization'
});

module.exports = {
  Organization
}
