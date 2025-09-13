import express from 'express';
import cors from 'cors';
require('dotenv').config();

// importar router
import router from './routes/index.js';

const server = express();
const port = process.env.SERVER_PORT ?? 3000;

// Cors config
server.use(cors());

// parsing json body
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// aplicar middleware de router
server.use('/tarefas', router.tarefas);

server.get('/', (req, res) => {
    res.send('Seja bem vindo a API de tarefas!');
});

server.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

export default server;
