import models from '../models';

const Usuario = models.Usuario;

const createUsuario = async (req, res) => {
    try {
        const { nomeCompleto, email, telefone, descricao } = req.body;
        const newUsuario = {
            nomeCompleto: nomeCompleto,
            email: email,
            telefone: telefone,
            descricao: descricao
        }

        const createdUsuario = await Usuario.create(newUsuario);
        res.status(201).send({
            message: 'Usuário criado com sucesso',
            usuario: createdUsuario
        });
    } catch(error){
        res.status(500).send({
            message: 'Erro interno do servidor ao criar usuário'
        });
    }
}

const getAllUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll();
        if (usuarios.length === 0) {
            return res.status(204).send({
                message: 'Nenhum usuário encontrado'
            });
        }
        res.status(200).send({
            message: 'Usuários encontrados com sucesso',
            usuarios: usuarios
        });
    } catch (error) {
        res.status(500).send({
            message: 'Erro interno do servidor ao buscar usuários'
        });
    }
}

const getUsuarioById = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).send({
                message: 'Usuário não encontrado'
            });
        }
        res.status(200).send({
            usuario
        });
    } catch (error) {
        res.status(500).send({
            message: 'Erro interno do servidor ao buscar usuário'
        });
    }
}

const updateUsuarioById = async (req, res) => {
    try {
        const { id } = req.params;
        const { nomeCompleto, email, telefone, descricao } = req.body;

        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).send({
                message: 'Usuário não encontrado'
            });
        }

        usuario.nomeCompleto = nomeCompleto || usuario.nomeCompleto;
        usuario.email = email || usuario.email;
        usuario.telefone = telefone || usuario.telefone;
        usuario.descricao = descricao || usuario.descricao;

        await usuario.save();

        res.status(200).send({
            message: 'Usuário atualizado com sucesso',
            usuario: usuario
        });
    } catch (error) {
        res.status(500).send({
            message: 'Erro interno do servidor ao atualizar usuário'
        });
    }
}

const deleteUsuarioById = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).send({
                message: 'Usuário não encontrado'
            });
        }
        await Usuario.destroy({
            where: { id: id }
        });
        res.status(204).send({
            message: 'Usuário deletado com sucesso'
        });
    } catch (error) {
        res.status(500).send({
            message: 'Erro interno do servidor ao deletar usuário'
        });
    }
}

export {
    createUsuario,
    getAllUsuarios,
    getUsuarioById,
    updateUsuarioById,
    deleteUsuarioById
}