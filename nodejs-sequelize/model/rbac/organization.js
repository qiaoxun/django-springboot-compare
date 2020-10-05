const {DataTypes, Model, Deferrable} = require('sequelize')
const {sequelize} = require('../../conf/db')
const {User} = require('./user')

// const Organization = sequelize.define('Actor', { 
//   name: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   type: {
//       type: DataTypes.STRING,
//       defaultValue: 'customer'
//   },
//   pid: {
//     type: DataTypes.INTEGER,

//     // references: {
//     //   // This is a reference to another model
//     //   model: Organization,

//     //   // This is the column name of the referenced model
//     //   key: 'id',

//     //   // With PostgreSQL, it is optionally possible to declare when to check the foreign key constraint, passing the Deferrable type.
//     //   deferrable: Deferrable.INITIALLY_IMMEDIATE
//     //   // Options:
//     //   // - `Deferrable.INITIALLY_IMMEDIATE` - Immediately check the foreign key constraints
//     //   // - `Deferrable.INITIALLY_DEFERRED` - Defer all foreign key constraint check to the end of a transaction
//     //   // - `Deferrable.NOT` - Don't defer the checks at all (default) - This won't allow you to dynamically change the rule in a transaction
//     // }
//   }
//  });

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

      // references: {
      //   // This is a reference to another model
      //   model: Organization,
  
      //   // This is the column name of the referenced model
      //   key: 'id',
  
      //   // With PostgreSQL, it is optionally possible to declare when to check the foreign key constraint, passing the Deferrable type.
      //   deferrable: Deferrable.INITIALLY_IMMEDIATE
      //   // Options:
      //   // - `Deferrable.INITIALLY_IMMEDIATE` - Immediately check the foreign key constraints
      //   // - `Deferrable.INITIALLY_DEFERRED` - Defer all foreign key constraint check to the end of a transaction
      //   // - `Deferrable.NOT` - Don't defer the checks at all (default) - This won't allow you to dynamically change the rule in a transaction
      // }
    }
}, {
  sequelize,
  modelName: 'organization',
  tableName: 'organization'
});

// Organization.associations = function() {
// Organization.hasOne(Organization, {foreignKey: 'pid', targetKey: 'id'})
// Organization.belongsTo(Organization, {foreignKey: 'pid', targetKey: 'id'})
// Organization.hasMany(User, {foreignKey: 'organizationId', targetKey: 'id'})
// }
// Organization.hasMany(User, {foreignKey: 'organizationId', targetKey: 'id'})

module.exports = {
  Organization
}
