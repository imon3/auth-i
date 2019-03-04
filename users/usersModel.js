const db = require('../data/knexConfig')

module.exports = {
    find,
    findUserBy
}

function find() {
    return db('users')
        .select('id', 'username', 'password')
}

function findUserBy(filter) {
    return db('users')
        .where(filter)
}
