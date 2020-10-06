const express = require('express');
const router = express.Router();
const {
    Organization
} = require('../../model/rbac/organization');
const {
    User
} = require('../../model/rbac/user');
const result = require('../../model/result');

/* list organizations */
router.get('/rbac/org/', async function (req, res) {
    console.log('list organizations called');
    const page = Number(req.query.page)
    const size = Number(req.query.size)

    const {
        count,
        rows
    } = await Organization.findAndCountAll({
        include: {
            model: Organization,
            as: 'org1'
        },
        offset: (page - 1) * size,
        limit: size
    });

    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        if (row.org1 && row.org1.name) {
            row.dataValues.parent = row.org1.name
        }
        if (row.type === 'company') {
            row.dataValues.type_meaning = 'Company'
        } else {
            row.dataValues.type_meaning = 'Department'
        }
    }

    res.json({
        count,
        results: rows
    });
});

/* get organization */
router.get('/rbac/org/:id', async function (req, res) {
    const id = Number(req.params.id);
    const organization = await Organization.findByPk(id)
    console.log('get organization called, id: ' + id);
    res.json(result.createResult(true, organization));
});

/* delete organization */
router.delete('/rbac/org/:id', async function (req, res) {
    const id = Number(req.params.id);
    await Organization.destroy({
        where: {
            id: id
        }
    });
    console.log('delete organization called, id=' + id);
    res.json(result.createResult(true, null));
});

/* add organizations */
router.post('/rbac/org/', async function (req, res) {
    console.log('post organizations called');
    const body = req.body;
    const org = await Organization.create(body)
    console.log(org)
    res.json(org);
});

/* update organizations */
router.put('/rbac/org/:id', async function (req, res) {
    console.log('update organizations called');
    const body = req.body;
    const id = Number(req.params.id);

    const org = await Organization.update(body, {
        where: {
            id: id
        }
    });

    console.log(org);
    const r = result.createResult(true, org);
    res.json(r);
});


module.exports = router;