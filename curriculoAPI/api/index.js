import express from 'express';
import 'dotenv/config'
import { sequelize } from './models/index.js';

const port = process.env.SERVER_PORT ?? 3000;
const server = express();

// Código para conseguir extrair o conteúdo do body da mensagem HTTP
// e armazenar na propriedade req.body (utiliza o body-parser)
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// middleware para log de requisições
server.use((req, res, next) => {
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    next();
});

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