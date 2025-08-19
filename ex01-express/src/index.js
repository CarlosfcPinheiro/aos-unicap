import 'dotenv/config';
// or require('dotenv/config').config() as commonJS

const express = require('express');
const server = express();

const port = 3000;

server.get('/', (req, res) => {
    res.send('Bem-vindo ao Express de Carlos')
});

server.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});
