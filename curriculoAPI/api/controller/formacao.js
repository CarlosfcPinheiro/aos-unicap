import models from '../models/index.js';

const Formacao = models.Formacao;
const Curriculo = models.Curriculo;

const createFormacao = async (req, res) => {
    try {
        const { curriculoId } = req.query;
        const { instituicao, curso, dataInicio, dataTermino } = req.body;
        const curriculo = await Curriculo.findByPk(curriculoId);
        if (!curriculo) {
            return res.status(404).send({
                message: 'Currículo não encontrado'
            });
        }
        const formacao = await Formacao.create({
            instituicao: instituicao,
            curso: curso,
            dataInicio: dataInicio,
            dataTermino: dataTermino,
            curriculoId: curriculo.id,
        });

        res.status(201).send({
            message: 'Formação criada com sucesso',
            data: formacao
        });
    } catch (error) {
        res.status(500).send({
            message: 'Erro interno do servidor ao criar formação'
        });
    }
}

const getAllFormacoes = async (req, res) => {
    try {
        const formacoes = await Formacao.findAll();
        if (formacoes.length === 0) {
            return res.status(204).send({
                message: 'Nenhuma formação encontrada'
            });
        }
        res.status(200).send({
            message: 'Formações encontradas com sucesso',
            data: formacoes
        });
    } catch (error) {
        res.status(500).send({
            message: 'Erro interno do servidor ao buscar formações'
        });
    }
}

const getFormacaoById = async (req, res) => {
    try {
        const { id } = req.params;
        const formacao = await Formacao.findByPk(id);
        if (!formacao) {
            return res.status(404).send({
                message: 'Formação não encontrada'
            });
        }
        res.status(200).send({
            message: 'Formação encontrada com sucesso',
            data: formacao
        });
    } catch (error) {
        res.status(500).send({
            message: 'Erro interno do servidor ao buscar formação'
        });
    }
}

const updateFormacaoById = async (req, res) => {
    try {
        const { id } = req.params;
        const { instituicao, curso, dataInicio, dataTermino } = req.body;
        const formacao = await Formacao.findByPk(id);
        if (!formacao) {
            return res.status(404).send({
                message: 'Formação não encontrada'
            });
        }
        formacao.instituicao = instituicao || formacao.instituicao;
        formacao.curso = curso || formacao.curso;
        formacao.dataInicio = dataInicio || formacao.dataInicio;
        formacao.dataTermino = dataTermino || formacao.dataTermino;

        await formacao.save();
        res.status(200).send({
            message: 'Formação atualizada com sucesso',
            data: formacao
        });
    } catch (error) {
        res.status(500).send({
            message: 'Erro interno do servidor ao atualizar formação'
        });
    }
}

const deleteFormacaoById = async (req, res) => {
    try {
        const { id } = req.params;
        const formacao = await Formacao.findByPk(id);
        if (!formacao) {
            return res.status(404).send({
                message: 'Formação não encontrada'
            });
        }
        await formacao.destroy();
        res.status(200).send({
            message: 'Formação deletada com sucesso'
        });
    } catch (error) {
        res.status(500).send({
            message: 'Erro interno do servidor ao deletar formação'
        });
    }
}

export {
    createFormacao,
    getAllFormacoes,
    getFormacaoById,
    updateFormacaoById,
    deleteFormacaoById
}