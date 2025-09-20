import { Router } from 'express';
import models from '../models/index';
import { where } from 'sequelize';

const User = models.User;

const router = Router();

router.get('/', async (req, res) => {
    try {
        const users = await User.findAll();
        return res.send({ usuarios: users });
    } catch (error) {
        return res.status(500).send({
            message: 'Erro interno do servidor ao buscar usuários',
        });
    }
});

router.get('/:userId', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.userId);
        if (!user) {
            return res.status(404).send({
                message: 'Usuário não encontrado',
            });
        }
        return res.status(200).send(user);
    } catch (error) {
        return res.status(500).send({
            message: 'Erro interno do servidor ao buscar usuário',
        });
    }
});

router.post('/', async (req, res) => {
    try {
        const { username, email } = req.body;
        const newUser = {
            username: username,
            email: email,
        };

        const createdUser = await User.create(newUser);
        return res.status(201).send({
            message: 'Usuário criado com sucesso',
            usuario: createdUser,
        });
    } catch (error) {
        return res.status(500).send({
            message: 'Erro interno do servidor ao criar usuário',
        });
    }
});

router.put('/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const { username, email } = req.body;

        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).send({
                message: 'Usuário não encontrado',
            });
        }

        const userBody = {
            username: username,
            email: email,
        };

        await User.update(userBody, {
            where: { id: userId },
        });
        const updatedUser = await User.findByPk(userId);
        return res.status(200).send({
            message: 'Usuário atualizado com sucesso',
            usuario: updatedUser,
        });
    } catch (error) {
        return res.status(500).send({
            message: 'Erro interno do servidor ao atualizar usuário',
        });
    }
});

router.delete('/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).send({
                message: 'Usuário não encontrado',
            });
        }
        User.destroy({
            where: { id: userId },
        });
        return res.status(204).end();
    } catch (error) {
        return res.status(500).send({
            message: 'Erro interno do servidor ao deletar usuário',
        });
    }
});

export default router;
