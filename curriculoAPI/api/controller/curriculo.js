import models from "../models"

const Curriculo = models.Curriculo;
const Usuario = models.Usuario;

const createCurriculo = async (req, res) => {
    try{
        const { usuarioId } = req.query;
        const { resumoProfissional } = req.body;
        const usuario = await Usuario.findByPk(usuarioId);
        if(!usuario){
            return res.status(404).send({
                message: 'Usuário não encontrado'
            });
        }

        const novoCurriculo = await Curriculo.create({
            usuarioId: usuarioId,
            resumoProfissional: resumoProfissional
        });
        res.status(201).send({
            message: 'Currículo criado com sucesso',
            data: novoCurriculo
        });
    } catch(error){
        res.status(500).send({
            message: 'Erro interno do servidor ao criar currículo'
        });
    }
}

const getAllCurriculos = async (req, res) => {
    try {
        const curriculos = await Curriculo.findAll();
        if (curriculos.length === 0) {
            return res.status(204).send({
                message: 'Nenhum currículo encontrado'
            });
        }
        res.status(200).send({
            message: 'Currículos encontrados com sucesso',
            data: curriculos
        });
    } catch (error) {
        res.status(500).send({
            message: 'Erro interno do servidor ao buscar currículos'
        });
    }
}

const getCurriculoById = async (req, res) => {
    try {
        const { id } = req.params;
        const curriculo = await Curriculo.findByPk(id);
        if (!curriculo) {
            return res.status(404).send({
                message: 'Currículo não encontrado'
            });
        }
        res.status(200).send({
            message: 'Currículo encontrado com sucesso',
            data: curriculo
        });
    } catch (error) {
        res.status(500).send({
            message: 'Erro interno do servidor ao buscar currículo'
        });
    }
}

const updateCurriculoById = async (req, res) => {
    try {
        const { id } = req.params;
        const { resumoProfissional } = req.body;

        const curriculo = await Curriculo.findByPk(id);
        if (!curriculo) {
            return res.status(404).send({
                message: 'Currículo não encontrado'
            });
        }

        curriculo.resumoProfissional = resumoProfissional || curriculo.resumoProfissional;

        await curriculo.save();

        res.status(200).send({
            message: 'Currículo atualizado com sucesso',
            data: curriculo
        });
    } catch (error) {
        res.status(500).send({
            message: 'Erro interno do servidor ao atualizar currículo'
        });
    }
}

const deleteCurriculoById = async (req, res) => {
    const { id } = req.params;
    try {
        const curriculo = await Curriculo.findByPk(id);
        if (!curriculo) {
            return res.status(404).send({
                message: 'Currículo não encontrado'
            });
        }

        await curriculo.destroy();

        res.status(200).send({
            message: 'Currículo deletado com sucesso'
        });
    } catch (error) {
        res.status(500).send({
            message: 'Erro interno do servidor ao deletar currículo'
        });
    }
}

export {
    createCurriculo,
    getAllCurriculos,
    getCurriculoById,
    updateCurriculoById,
    deleteCurriculoById
}