const router = require('express').Router()
const bcryptjs = require('bcryptjs');
const session = require('express-session');
const knexSessionStore = require('connect-session-knex')(session);

const db = require('../data/knexConfig');
const Users = require('../users/usersModel');

// SESSION TO KEEP COOKIES
const sessionSecret = 'this is a secret, keep it to yourself!'
const sessionConfig = {
    name: 'panther',
    secret: sessionSecret,
    cookie: {
        maxAge: 1000 * 60 * 15,
        secure: false
    },
    httpOnly: true,
    resave: false,
    saveUninitialized: false,

    store: new knexSessionStore({
        knex: db,
        tablename: 'sessionsTable',
        sidfieldname: 'sid',
        createtable: true,
        clearInterval: 1000 * 60 * 60
    })
}

// CALL SESSION TO BE USED
router.use(session(sessionConfig));

// MIDDLEWARE
function restricted(req, res, next) {
    if (req.session && req.session.username) {
        next()
    } else {
        res.status(401).json({ message: 'No Access' })
    }
}
// function restricted(req, res, next) {
//     let { username, password } = req.headers;

//     if (username && password) {
//         Users.findUserBy({ username })
//             .first()
//             .then((user => {
//                 if (user && bcryptjs.compareSync(password, user.password)) {
//                     next()
//                 } else {
//                     res.status(401).json({ message: 'Invalid Credentials' })
//                 }
//             }))
//             .catch(err => {
//                 res.status(500).json(err)
//             })
//     } else {
//         res.status(400).json({ message: 'No credentials provided.' })
//     }
// }

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
                req.session.username = user.username;
                res.status(200).json({ message: `Welcome ${user.username}, here's a cookie...` })
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

// LOG OUT USER
router.get('/logout', (req, res) => {
    if (req.session) {
        req.session.destroy(err => {
            if (err) {
                res.send('You may logout at any time.');
            } else {
                res.send('later, thanks for coming!');
            }
        })
    } else {
        res.end()
    }
})

module.exports = router;

