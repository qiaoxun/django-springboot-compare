const Sequelize = require('sequelize')

const mysqlConf = require('./mysqlConf').mysql

const {
  database,
  host,
  port,
  user,
  password
} = mysqlConf

const sequelize = new Sequelize(database, user, password, {
  dialect: 'mysql',
  host,
  dialectOptions: {
    // Your mysql2 options here
  },
  define: {
    underscored: true,
  }
})

// const sequelize = new Sequelize(dbName, user, password, {
// ​  dialect: 'mysql',
// ​  host,
// ​  port,
// ​  logging: true,
// ​  timezone: '+08:00',
// ​  define: {
// ​    // create_time && update_time
// ​    timestamps: true,
// ​    // delete_time
// ​    paranoid: true,
// ​    createdAt: 'created_at',
// ​    updatedAt: 'updated_at',
// ​    deletedAt: 'deleted_at',
// ​    // 把驼峰命名转换为下划线
// ​    underscored: true,
// ​    scopes: {
// ​    bh: {
// ​                attributes: {
// ​                    exclude: ['password', 'updated_at', 'deleted_at', 'created_at']
// ​                }
// ​            },
// ​            iv: {
// ​                attributes: {
// ​                    exclude: ['content', 'password', 'updated_at', 'deleted_at']
// ​                }
// ​            }
// ​        }
// ​    }
// })

// sequelize.sync({ force: false })

module.exports = {
  sequelize
}
