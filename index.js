const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const userRouter = require('./router/users-router');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api', userRouter);


server.get('/', (req, res) => {
    res.send('Server Running')
})

server.listen(4000, function () {
    console.log('Listening on localhost:4000')
})