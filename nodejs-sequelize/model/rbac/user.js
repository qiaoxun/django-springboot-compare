const {
    DataTypes,
    Model,
    Deferrable
} = require('sequelize')
const {
    sequelize
} = require('../../conf/db')

const {
    Organization
} = require('./organization')

class User extends Model {}
User.init({
    // attributes
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    first_name: {
        type: DataTypes.STRING
    },
    last_name: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    organization_id: {
        type: DataTypes.INTEGER,
    }
}, {
    sequelize,
    modelName: 'user',
    tableName: 'user'
    // options
});

module.exports = {
    User
}