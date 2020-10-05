const {sequelize} = require('./conf/db')
const {User} = require('./model/rbac/user')
const {Organization} = require('./model/rbac/organization')

async function createOrganizationModel() {
  await Organization.sync({ force: true });
  console.log("Organization were synchronized successfully.");
}

createOrganizationModel()


async function createUserModel() {
  await User.sync({ force: true });
  console.log("User were synchronized successfully.");
}

createUserModel()