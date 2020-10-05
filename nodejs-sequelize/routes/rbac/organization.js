const express = require('express');
const router = express.Router();
const {Organization} = require('../../model/rbac/organization');
const {User} = require('../../model/rbac/user');
const result = require('../../model/result');

/* list organizations */
router.get('/rbac/org/', async function(req, res) {
    console.log('list organizations called');
    const page = Number(req.query.page)
    const size = Number(req.query.size)

    const { count, rows } = await Organization.findAndCountAll({
        offset: (page - 1) * size,
        limit: size
      });

    res.json({
        count,
        results: rows
    });
});

/* get organization */
router.get('/rbac/org/:id', async function(req, res) {
    const id = Number(req.params.id);
    const organization = await Organization.findByPk(id)
    console.log('get organization called, id: ' + id);
    res.json(result.createResult(true, organization));
});

/* delete organization */
router.delete('/rbac/org/:id', async function (req, res) {
    const id = Number(req.params.id);
    const organization = Organization.findByPk(id)
    console.log('delete organization called, id=' + id);
    await organization.destroy()
    res.json(result.createResult('success', null));
});

/* add organizations */
router.post('/rbac/org/', async function (req, res) {
    console.log('post organizations called');
    const body = req.body;
    const org = Organization.build({name: body.name, type: body.type, pid: body.pid})
    await org.save()
    console.log(org)
    res.json(org);
});

/* update organizations */
router.put('/rbac/org/:id', async function (req, res) {
    console.log('update organizations called');
    const body = req.body;
    body.id = Number(req.params.id);
    const org = await Organization.findByPk(body.id)
    org.name = body.name
    org.type = body.type
    org.pid = body.pid
    await org.save()
    console.log(org);
    const r =  result.createResult(success, null);
    res.json(r);
});


module.exports = router;
