const express = require('express');
const router = express.Router();
const userDAO = require('../../dao/rbac/userDAO');
const result = require('../../model/result');

/* list users */
router.get('/rbac/user/', function(req, res) {
    console.log('list users called');
    const organization_id = Number(req.query.organization)
    const page = Number(req.query.page)
    const size = Number(req.query.size)
    userDAO.list(organization_id, page, size, function (list) {
        res.json(list);
    });
});

/* get user */
router.get('/rbac/user/:id', function(req, res) {
    const id = req.params.id;
    console.log('get user called, id: ' + id);
    userDAO.getById(id, function (user) {
        res.json(result.createResult(true, user));
    });
});

/* delete user */
router.delete('/rbac/user/:id', function (req, res) {
    const id = req.params.id;
    console.log('delete user called, id=' + id);
    userDAO.deleteById(id, function (success) {
        res.json(result.createResult(success, null));
    });
});

/* add users */
router.post('/rbac/user/', function (req, res) {
    console.log('post users called');
    const user = req.body;
    user.organization_id = user.organization
    console.log(user);
    userDAO.add(user, function (success) {
        const r =  result.createResult(success, null);
        res.json(r);
    });
});

/* update users */
router.put('/rbac/user/:id', function (req, res) {
    console.log('update users called');
    const user = req.body;
    user.id = Number(req.params.id);
    console.log(user);
    userDAO.update(user, function (success) {
        const r =  result.createResult(success, null);
        res.json(r);
    });
});


module.exports = router;
