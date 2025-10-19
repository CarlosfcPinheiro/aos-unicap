import express from 'express';
import { sequelize } from './models/index.js';
import 'dotenv/config';
import cors from 'cors';

import users from './utils/defaultRegisters.js';

import models from './models/index.js';
import router from './routes/index.js';

const port = process.env.SERVER_PORT ?? 3000;
const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use((req, res, next) => {
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    next();
});

server.use(cors());
// Aplicando middlewares de rota
server.use('/usuarios', router.usuario);
server.use('/curriculos', router.curriculo);
server.use('/projetos', router.projeto);
server.use('/formacoes', router.formacao);
server.use('/experiencias', router.experiencia);

server.get('/', (req, res) => {
    res.send('Seja bem-vindo a API de Currículo!');
});

const eraseDatabaseOnSync = process.env.ERASE_DATABASE === 'true';
sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
    if (eraseDatabaseOnSync) {
        await createDefaultRegisters();
        console.log('Banco de dados reiniciado e criado com os dados padrão!');
    }

    server.listen(port, () => {
        console.log(`Servidor ouvindo na porta ${port}...`);
    });
});

const createDefaultRegisters = async () => {
    users.forEach(async (userData) => {
        const user = await models.Usuario.create({
            nomeCompleto: userData.nomeCompleto,
            email: userData.email,
            telefone: userData.telefone,
            descricao: userData.descricao,
        });
        const curriculo = await models.Curriculo.create({
            resumoProfissional: 'Currículo padrão para ' + user.nomeCompleto,
            usuarioId: user.id,
        });
        await models.Projeto.create({
            nome: 'Projeto Padrão de ' + user.nomeCompleto,
            descricao: 'Descrição do projeto padrão para ' + user.nomeCompleto,
            link: 'http://exemplo.com/projeto',
            curriculoId: curriculo.id,
        });
        await models.Formacao.create({
            instituicao: 'Instituição Padrão',
            curso: 'Curso Padrão de ' + user.nomeCompleto,
            dataInicio: '2020-01-01',
            dataTermino: '2024-01-01',
            curriculoId: curriculo.id,
        });
        await models.Experiencia.create({
            empresa: 'Empresa Padrão',
            cargo: 'Cargo Padrão de ' + user.nomeCompleto,
            dataInicio: '2021-01-01',
            dataTermino: '2023-01-01',
            descricaoAtividades: 'Atividades padrão realizadas na empresa.',
            curriculoId: curriculo.id,
        });
    });
}

export default server;