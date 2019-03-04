const router = require('express').Router()
const bcryptjs = require('bcryptjs');

const db = require('../data/knexConfig');
const Users = require('../users/usersModel');

router.post('/register', (req, res) => {
    let user = req.body;

    const hash = bcryptjs.hashSync(user.password, 12);

    user.password = hash;

    Users.add(user)
        .then(savedUser => {
            res.status(201).json(savedUser)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

module.exports = router;

