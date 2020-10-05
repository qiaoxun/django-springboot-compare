var mysql = require('mysql');
var mysqlConf = require('../../conf/mysqlConf');
var userSqlMap = require('./userSqlMap');
var pool = mysql.createPool(mysqlConf.mysql);

module.exports = {
    add: function (user, callback) {
        pool.query(userSqlMap.add, [user.name, user.first_name, user.last_name, user.password, user.email, user.organization_id], function (error, result) {
            if (error) throw error;
            callback(result.affectedRows > 0);
        });
    },
    list: function (organization_id, page, size, callback) {
        pool.query(userSqlMap.list, [organization_id, (page - 1) * size, size], function (error, data) {
            if (error) throw error;
            pool.query(userSqlMap.count, organization_id, function (error2, count) {
                if (error) throw count;
                const result = {
                    'count': count[0].count,
                    'results': data,
                }
                callback(result);
            });
        });
    },
    getById: function (id, callback) {
        pool.query(userSqlMap.getById, id, function (error, result) {
            if (error) throw error;
            console.log(result[0]);
            callback(result[0]);
        });
    },
    deleteById: function (id, callback) {
        pool.query(userSqlMap.deleteById, id, function (error, result) {
            if (error) throw error;
            callback(result.affectedRows > 0);
        });
    },
    update: function (user, callback) {
        pool.query(userSqlMap.update, [user.name, user.first_name, user.last_name, user.password, user.email, user.organization_id, user.id], function (error, result) {
            if (error) throw error;
            callback(result.affectedRows > 0);
        });
    }
};
