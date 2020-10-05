const {User} = require('./model/rbac/user')

async function createUser() {
  const jane = User.build({ name: "Jane" })
  await jane.save();
}

createUser()
