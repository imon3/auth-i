const router = require('express').Router()
const bcryptjs = require('bcryptjs');

const Users = require('../users/usersModel');

// MIDDLEWARE
function restricted(req, res, next) {
    let { username, password } = req.headers;

    if (username && password) {
        Users.findUserBy({ username })
            .first()
            .then((user => {
                if (user && bcryptjs.compareSync(password, user.password)) {
                    next()
                } else {
                    res.status(401).json({ message: 'Invalid Credentials' })
                }
            }))
            .catch(err => {
                res.status(500).json(err)
            })
    } else {
        res.status(400).json({ message: 'No credentials provided.' })
    }
}

// REGISTER NEW USER
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

// LOGIN USER
router.post('/login', (req, res) => {
    let { username, password } = req.body;

    Users.findUserBy({ username })
        .first()
        .then(user => {
            if (user && bcryptjs.compareSync(password, user.password)) {
                res.status(200).json({ message: `Welcome ${user.username}` })
            } else {
                res.status(401).json({ message: 'Invalid Credentials' })
            }
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

// GET ALL USERS
router.get('/users', restricted, (req, res) => {
    Users.find()
        .then(users => {
            res.json(users)
        })
        .catch(err => res.send(err))
})

module.exports = router;

