var mysql = require('mysql');
var mysqlConf = require('../../conf/mysqlConf');
var organizationSqlMap = require('./organizationSqlMap');
var pool = mysql.createPool(mysqlConf.mysql);

module.exports = {
    add: function (org, callback) {
        pool.query(organizationSqlMap.add, [org.name, org.type, org.pid], function (error, result) {
            if (error) throw error;
            callback(result.affectedRows > 0);
        });
    },
    list: function (page, size, callback) {
        pool.query(organizationSqlMap.list, [(page - 1) * size, size], function (error, data) {
            if (error) throw error;
            pool.query(organizationSqlMap.count, function (error2, count) {
                if (error) throw error;
                const result = {
                    'count': count[0].count,
                    'results': data,
                }
                callback(result);
            });
        });
    },
    getById: function (id, callback) {
        pool.query(organizationSqlMap.getById, id, function (error, result) {
            if (error) throw error;
            console.log(result[0]);
            callback(result[0]);
        });
    },
    deleteById: function (id, callback) {
        pool.query(organizationSqlMap.deleteById, id, function (error, result) {
            if (error) throw error;
            callback(result.affectedRows > 0);
        });
    },
    update: function (org, callback) {
        pool.query(organizationSqlMap.update, [org.name, org.type, org.pid, org.id], function (error, result) {
            if (error) throw error;
            callback(result.affectedRows > 0);
        });
    }
};
