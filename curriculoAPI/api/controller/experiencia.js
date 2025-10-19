import models from "../models/index.js";

const Experiencia = models.Experiencia;
const Curriculo = models.Curriculo;

const createExperiencia = async (req, res) => {
    try{
        const { curriculoId } = req.query;
        const { empresa, cargo, dataInicio, dataTermino, descricaoAtividades } = req.body;
        const curriculo = await Curriculo.findByPk(curriculoId);
        if (!curriculo) {
            return res.status(404).send({
                message: 'Currículo não encontrado'
            });
        }
        const experiencia = await Experiencia.create({
            empresa: empresa,
            cargo: cargo,
            dataInicio: dataInicio,
            dataTermino: dataTermino,
            descricaoAtividades: descricaoAtividades,
            curriculoId: curriculo.id,
        });

        res.status(201).send({
            message: 'Experiência criada com sucesso',
            data: experiencia
        });
    } catch(error){
        res.status(500).send({
            message: 'Erro interno do servidor ao criar experiência'
        });
    }
}

const getAllExperiencias = async (req, res) => {
    try {
        const experiencias = await Experiencia.findAll();
        if (experiencias.length === 0) {
            return res.status(204).send({
                message: 'Nenhuma experiência encontrada'
            });
        }
        res.status(200).send({
            message: 'Experiências encontradas com sucesso',
            data: experiencias
        });
    } catch (error) {
        res.status(500).send({
            message: 'Erro interno do servidor ao buscar experiências'
        });
    }
}

const getExperienciaById = async (req, res) => {
    try {
        const { id } = req.params;
        const experiencia = await Experiencia.findByPk(id);
        if (!experiencia) {
            return res.status(404).send({
                message: 'Experiência não encontrada'
            });
        }
        res.status(200).send({
            message: 'Experiência encontrada com sucesso',
            data: experiencia
        });
    } catch (error) {
        res.status(500).send({
            message: 'Erro interno do servidor ao buscar experiência'
        });
    }
}

const updateExperienciaById = async (req, res) => {
    try {
        const { id } = req.params;
        const { empresa, cargo, dataInicio, dataTermino, descricaoAtividades } = req.body;

        const experiencia = await Experiencia.findByPk(id);
        if (!experiencia) {
            return res.status(404).send({
                message: 'Experiência não encontrada'
            });
        }

        experiencia.empresa = empresa || experiencia.empresa;
        experiencia.cargo = cargo || experiencia.cargo;
        experiencia.dataInicio = dataInicio || experiencia.dataInicio;
        experiencia.dataTermino = dataTermino || experiencia.dataTermino;
        experiencia.descricaoAtividades = descricaoAtividades || experiencia.descricaoAtividades;

        await experiencia.save();

        res.status(200).send({
            message: 'Experiência atualizada com sucesso',
            data: experiencia
        });
    } catch (error) {
        res.status(500).send({
            message: 'Erro interno do servidor ao atualizar experiência'
        });
    }
}

const deleteExperienciaById = async (req, res) => {
    try {
        const { id } = req.params;
        const experiencia = await Experiencia.findByPk(id);
        if (!experiencia) {
            return res.status(404).send({
                message: 'Experiência não encontrada'
            });
        }

        await experiencia.destroy();

        res.status(200).send({
            message: 'Experiência deletada com sucesso'
        });
    } catch (error) {
        res.status(500).send({
            message: 'Erro interno do servidor ao deletar experiência'
        });
    }
}

export {
    createExperiencia,
    getAllExperiencias,
    getExperienciaById,
    updateExperienciaById,
    deleteExperienciaById
}