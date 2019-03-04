const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bcryptjs = require('bcryptjs');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.get('/', (req, res) => {
    res.send('Server Running')
})

server.listen(4000, function () {
    console.log('Listening on localhost:4000')
})