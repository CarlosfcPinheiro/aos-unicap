import express from 'express';
import { sequelize } from './models/index.js';
import 'dotenv/config';

import router from './routes/index.js';

const port = process.env.SERVER_PORT ?? 3000;
const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use((req, res, next) => {
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    next();
});

// Aplicando middlewares de rota
server.use('/usuarios', router.usuario);

server.get('/', (req, res) => {
    res.send('Seja bem-vindo a API de Currículo!');
});

const eraseDatabaseOnSync = process.env.ERASE_DATABASE === 'true';
sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
    if (eraseDatabaseOnSync) {
        console.log('Banco de dados reiniciado!');
    }

    server.listen(port, () => {
        console.log(`Servidor ouvindo na porta ${port}...`);
    });
});

export default server;