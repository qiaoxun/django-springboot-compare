const express = require('express');
const router = express.Router();
const organizationDAO = require('../../dao/rbac/organizationDAO');
const result = require('../../model/result');

/* list organizations */
router.get('/rbac/org/', function(req, res) {
    console.log('list organizations called');
    const page = Number(req.query.page)
    const size = Number(req.query.size)
    organizationDAO.list(page, size, function (list) {
        res.json(list);
    });
});

/* get organization */
router.get('/rbac/org/:id', function(req, res) {
    const id = req.params.id;
    console.log('get organization called, id: ' + id);
    organizationDAO.getById(id, function (organization) {
        res.json(result.createResult(true, organization));
    });
});

/* delete organization */
router.delete('/rbac/org/:id', function (req, res) {
    const id = req.params.id;
    console.log('delete organization called, id=' + id);
    organizationDAO.deleteById(id, function (success) {
        res.json(result.createResult(success, null));
    });
});

/* add organizations */
router.post('/rbac/org/', function (req, res) {
    console.log('post organizations called');
    const organization = req.body;
    console.log(organization);
    organizationDAO.add(organization, function (success) {
        const r =  result.createResult(success, null);
        res.json(r);
    });
});

/* update organizations */
router.put('/rbac/org/:id', function (req, res) {
    console.log('update organizations called');
    const organization = req.body;
    organization.id = req.params.id;
    console.log(organization);
    organizationDAO.update(organization, function (success) {
        const r =  result.createResult(success, null);
        res.json(r);
    });
});


module.exports = router;
