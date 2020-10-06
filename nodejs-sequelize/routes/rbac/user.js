const express = require('express');
const router = express.Router();
const {
    User
} = require('../../model/rbac/user');
const {
    Organization
} = require('../../model/rbac/organization');
const result = require('../../model/result');

/* list users */
router.get('/rbac/user/', async function (req, res) {
    console.log('list users called');
    const organization_id = Number(req.query.organization)
    const page = Number(req.query.page)
    const size = Number(req.query.size)
    const {
        count,
        rows
    } = await User.findAndCountAll({
        include: {
            model: Organization
        },
        where: {
            organization_id: organization_id
        },
        offset: (page - 1) * size,
        limit: size
    });

    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        if (row.organization && row.organization.name) {
            row.dataValues.organization_name = row.organization.name
        }
    }

    res.json({
        count,
        results: rows
    });
});

/* get user */
router.get('/rbac/user/:id', async function (req, res) {
    const id = req.params.id;
    console.log('get user called, id: ' + id);
    const user = await User.findByPk(id)
    res.json(result.createResult(true, user));
});

/* delete user */
router.delete('/rbac/user/:id', async function (req, res) {
    const id = req.params.id;
    console.log('delete user called, id=' + id);
    await User.destroy({
        where: {
            id: id
        }
    });
    res.json(result.createResult(true, null));
});

/* add users */
router.post('/rbac/user/', async function (req, res) {
    console.log('post users called');
    let user = req.body;
    user.organization_id = user.organization
    user = await User.create(user)
    console.log(user)
    res.json(user);
});

/* update users */
router.put('/rbac/user/:id', async function (req, res) {
    console.log('update users called');
    let user = req.body;

    user = await User.update(user, {
        where: {
            id: req.params.id
        }
    });
    res.json(user);
});


module.exports = router;