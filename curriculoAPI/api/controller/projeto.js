import models from '../models/index.js';

const Projeto = models.Projeto;
const Curriculo = models.Curriculo;

const createProjeto = async (req, res) => {
    try {
        const { curriculoId } = req.query;
        const { nome, descricao, link } = req.body;
        const curriculo = await Curriculo.findByPk(curriculoId);
        if (!curriculo) {
            return res.status(404).send({
                message: 'Currículo não encontrado'
            });
        }
        const projeto = await Projeto.create({
            nome: nome,
            descricao: descricao,
            link: link,
            curriculoId: curriculo.id,
        });

        res.status(201).send({
            message: 'Projeto criado com sucesso',
            data: projeto
        });
    } catch (error) {
        res.status(500).send({
            message: 'Erro interno do servidor ao criar projeto'
        });
    }
}

const getAllProjetos = async (req, res) => {
    try {
        const projetos = await Projeto.findAll();
        if (projetos.length === 0) {
            return res.status(204).send({
                message: 'Nenhum projeto encontrado'
            });
        }
        res.status(200).send({
            message: 'Projetos encontrados com sucesso',
            data: projetos
        });
    } catch (error) {
        res.status(500).send({
            message: 'Erro interno do servidor ao buscar projetos'
        });
    }
}

const getProjetoById = async (req, res) => {
    try {
        const { id } = req.params;
        const projeto = await Projeto.findByPk(id);
        if (!projeto) {
            return res.status(404).send({
                message: 'Projeto não encontrado'
            });
        }
        res.status(200).send({
            message: 'Projeto encontrado com sucesso',
            data: projeto
        });
    } catch (error) {
        res.status(500).send({
            message: 'Erro interno do servidor ao buscar projeto'
        });
    }
}

const updateProjetoById = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, descricao, link } = req.body;
        const projeto = await Projeto.findByPk(id);
        if (!projeto) {
            return res.status(404).send({
                message: 'Projeto não encontrado'
            });
        }
        projeto.nome = nome || projeto.nome;
        projeto.descricao = descricao || projeto.descricao;
        projeto.link = link || projeto.link;
        await projeto.save();
        res.status(200).send({
            message: 'Projeto atualizado com sucesso',
            data: projeto
        });
    } catch (error) {
        res.status(500).send({
            message: 'Erro interno do servidor ao atualizar projeto'
        });
    }
}

const deleteProjetoById = async (req, res) => {
    try {
        const { id } = req.params;
        const projeto = await Projeto.findByPk(id);
        if (!projeto) {
            return res.status(404).send({
                message: 'Projeto não encontrado'
            });
        }
        await projeto.destroy();
        res.status(200).send({
            message: 'Projeto deletado com sucesso'
        });
    } catch (error) {
        res.status(500).send({
            message: 'Erro interno do servidor ao deletar projeto'
        });
    }
}

export {
    createProjeto,
    getAllProjetos,
    getProjetoById,
    updateProjetoById,
    deleteProjetoById
}