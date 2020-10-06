const {User} = require('./rbac/user')
const {Organization} = require('./rbac/organization')

User.belongsTo(Organization, {foreignKey: 'organizationId', targetKey: 'id'})
Organization.hasOne(Organization, {foreignKey: 'pid', targetKey: 'id', as: 'org1'})
Organization.belongsTo(Organization, {foreignKey: 'pid', targetKey: 'id'})
Organization.hasMany(User, {foreignKey: 'organizationId', targetKey: 'id'})
