var userSqlMap = {
    add: 'insert into user(name, first_name, last_name, password, email, organization_id) values(?, ?, ?, ?, ?, ?)',
    deleteById: 'delete from user where id = ?',
    update: 'update user set name=?, first_name=?, last_name=?, password=?, email=?, organization_id=? where id=?',
    list: 'select u.*, o.name organization_name from user u left join organization o on u.organization_id=o.id where organization_id = ? limit ?, ?',
    count: 'select count(*) count from user where organization_id = ?',
    getById: 'select * from user where id = ?'
};

module.exports = userSqlMap;