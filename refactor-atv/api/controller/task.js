import models from "../models";

const Task = models.Task;

const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.findAll();
        return res.send({ tarefas: tasks });
    } catch (error) {
        return res.status(500).send({
            message: 'Erro interno do servidor ao buscar tarefas',
        });
    }
}

const getTaskById = async (req, res) => {
    try {
        const { taskId } = req.params;
    const task = await Task.findOne({ where: { objectId: taskId } });
        if (!task) {
            return res.status(404).send({
                message: 'Tarefa não encontrada',
            });
        }
        return res.status(200).send(task);
    } catch (error) {
        return res.status(500).send({
            message: 'Erro interno do servidor ao buscar tarefa',
        });
    }
}

const createTask = async (req, res) => {
    try {
        const { description, completed } = req.body;

        const newTask = await Task.create({
            descricao: description,
            concluida: completed,
        });
        return res.status(201).send({
            message: 'Tarefa criada com sucesso',
            tarefa: newTask,
        });
    } catch (error) {
        return res.status(500).send({
            message: 'Erro interno do servidor ao criar tarefa',
        });
    }
}

const updateTaskById = async (req, res) => {
    try {
        const { taskId } = req.params;
        const { description, completed } = req.body;

    const task = await Task.findOne({ where: { objectId: taskId } });
        if (!task) {
            return res.status(404).send({
                message: 'Tarefa não encontrada',
            });
        }

        const updateFields = {};
        if (description !== undefined) updateFields.descricao = description;
        if (completed !== undefined) updateFields.concluida = completed;


        await Task.update(
            updateFields,
            {
                where: { objectId: taskId },
            }
        );

    const updatedTask = await Task.findOne({ where: { objectId: taskId } });
        return res.status(200).send({
            message: 'Tarefa atualizada com sucesso',
            tarefa: updatedTask,
        });
    } catch (error) {
        return res.status(500).send({
            message: 'Erro interno do servidor ao atualizar tarefa',
        });
    }
}

const deleteTaskById = async (req, res) => {
    try {
        const { taskId } = req.params;
    const task = await Task.findOne({ where: { objectId: taskId } });
        if (!task) {
            return res.status(404).send({
                message: 'Tarefa não encontrada',
            });
        }

        await Task.destroy({
            where: { objectId: taskId },
        });
        return res.status(204).send({
            message: 'Tarefa deletada com sucesso',
        });
    } catch (error) {
        return res.status(500).send({
            message: 'Erro interno do servidor ao deletar tarefa',
        });
    }
}

export {
    getAllTasks, 
    getTaskById, 
    createTask, 
    updateTaskById, 
    deleteTaskById
}