var organizationSqlMap = {
    add: 'insert into organization(name, type, pid) values(?, ?, ?)',
    deleteById: 'delete from organization where id = ?',
    update: 'update organization set name=?, type=?, pid=? where id=?',
    list: `select o.*, if(o.type='company', 'Company', 'Department') type_meaning, p.name parent from organization o left join organization p on o.pid = p.id limit ?, ?`,
    count: 'select count(*) count from organization',
    getById: 'select * from organization where id = ?'
};

module.exports = organizationSqlMap;