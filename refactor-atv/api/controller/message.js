import models from "../models";

const Message = models.Message;

const getAllMessages = async (req, res) => {
    try {
        const messages = await Message.findAll();
        return res.send({ mensagens: messages });
    } catch (error) {
        return res.status(500).send({
            message: 'Erro interno do servidor ao buscar mensagens',
        });
    }
}

const getMessageById = async (req, res) => {
    try {
        const { messageId } = req.params;
        const message = await Message.findByPk(messageId);
        if (!message) {
            return res.status(404).send({
                message: 'Mensagem não encontrada',
            });
        }
        return res.status(200).send(message);
    } catch (error) {
        return res.status(500).send({
            message: 'Erro interno do servidor ao buscar mensagem',
        });
    }
}

const createMessage = async (req, res) => {
    try {
        const { userId } = req.query;
        const { text } = req.body;

        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).send({
                message: 'Usuário não existente com o id fornecido',
            });
        }

        const newMessage = await Message.create({
            text: text,
            userId: userId,
        });
        return res.status(201).send({
            message: 'Mensagem criada com sucesso',
            mensagem: newMessage,
        });
    } catch (error) {
        return res.status(500).send({
            message: 'Erro interno do servidor ao criar mensagem',
        });
    }
}

const updateMessageById = async (req, res) => {
    try {
        const { messageId } = req.params;
        const { text } = req.body;

        const message = await Message.findByPk(messageId);
        if (!message) {
            return res.status(404).send({
                message: 'Mensagem não encontrada',
            });
        }

        await Message.update(
            { text: text },
            {
                where: { id: messageId },
            }
        );

        const updatedMessage = await Message.findByPk(messageId);
        return res.status(200).send({
            message: 'Mensagem atualizada com sucesso',
            mensagem: updatedMessage,
        });
    } catch (error) {
        return res.status(500).send({
            message: 'Erro interno do servidor ao atualizar mensagem',
        });
    }
}

const deleteMessageById = async (req, res) => {
    try {
        const { messageId } = req.params;
        const message = await Message.findByPk(messageId);
        if (!message) {
            return res.status(404).send({
                message: 'Mensagem não encontrada',
            });
        }

        await Message.destroy({
            where: { id: messageId },
        });
        return res.status(204).send({
            message: 'Mensagem deletada com sucesso',
        });
    } catch (error) {
        return res.status(500).send({
            message: 'Erro interno do servidor ao deletar mensagem',
        });
    }
}

export {
    getAllMessages, 
    getMessageById, 
    createMessage, 
    updateMessageById, 
    deleteMessageById
}