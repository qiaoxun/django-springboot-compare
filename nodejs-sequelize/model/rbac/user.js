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

// const User = sequelize.define('User', {
//         name: {
//             type: DataTypes.STRING,
//             allowNull: false
//         },
//         firstName: {
//             type: DataTypes.STRING
//         },
//         lastName: {
//             type: DataTypes.STRING
//         },
//         password: {
//             type: DataTypes.STRING
//         },
//         email: {
//             type: DataTypes.STRING
//         },
//         organizationId: {
//             type: DataTypes.INTEGER,
//         }
//     }
// );

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

        // references: {
        //     // This is a reference to another model
        //     model: Organization,

        //     // This is the column name of the referenced model
        //     key: 'id',

        //     // With PostgreSQL, it is optionally possible to declare when to check the foreign key constraint, passing the Deferrable type.
        //     deferrable: Deferrable.INITIALLY_IMMEDIATE
        //     // Options:
        //     // - `Deferrable.INITIALLY_IMMEDIATE` - Immediately check the foreign key constraints
        //     // - `Deferrable.INITIALLY_DEFERRED` - Defer all foreign key constraint check to the end of a transaction
        //     // - `Deferrable.NOT` - Don't defer the checks at all (default) - This won't allow you to dynamically change the rule in a transaction
        //   }
    }
}, {
    sequelize,
    modelName: 'user',
    tableName: 'user'
    // options
});

// Organization.associations = function() {
//     User.belongsTo(Organization, {foreignKey: 'organizationId', targetKey: 'id'})
// }

// User.belongsTo(Organization, {foreignKey: 'organizationId', targetKey: 'id'})

module.exports = {
    User
}