import 'dotenv/config';
// or require('dotenv/config').config() as commonJS

const express = require('express');
const server = express();
server.use(require('cors')());

// Importing middlewares
const { basicMidleware } = require('./midlewares/basicMidleware');

const port = 3000;

server.get('/', (req, res) => {
    res.send('Bem-vindo ao Express de Carlos');
});

server.get('/example', basicMidleware, (req, res) => {
    res.send('Eu sou um exemplo :)');
});

server.listen(port, () => console.log(`Listening on port ${port}...`));