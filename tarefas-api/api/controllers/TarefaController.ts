import type { Request, Response } from 'express';
import type { Tarefa } from '../models/Tarefa';
// v4 as uuidv4 cria um alias da função v4 para uuidv4
import { v4 as uuidv4 } from 'uuid';

// import dto
import type { TarefaRequestDTO } from '../dto/TarefaRequestDTO';

const tarefas: Array<Tarefa> = [
    {
        id: uuidv4(),
        descricao: 'Fazer atividade de Márcio',
        concluida: false,
    },
    {
        id: uuidv4(),
        descricao: 'Estudar React Native',
        concluida: true,
    },
];

const getAllTarefas = (req: Request, res: Response) => {
    if (tarefas.length === 0) {
        res.status(204).send({
            status: 204,
            message: 'Ainda não existe nenhuma tarefa',
        });
        return;
    }

    res.status(200).send(tarefas);
};

const getTarefaById = (req: Request, res: Response) => {
    const id = req.params.id;
    const tarefa = tarefas.find((tarefa) => tarefa.id === id);

    if (!tarefa) {
        res.status(404).send({
            status: 404,
            message: 'tarefa não encontrada',
        });
        return;
    }

    res.status(200).send(tarefa);
};

const addTarefa = (req: Request, res: Response) => {
    const body: TarefaRequestDTO = req.body;
    const tarefa: Tarefa = {
        id: uuidv4(),
        descricao: body.descricao,
        concluida: body.concluida == null ? false : body.concluida,
    };

    tarefas.push(tarefa);

    res.status(200).send({
        status: 200,
        message: 'Tarefa adicionada com sucesso',
        tarefa: tarefa,
    });
};

const updateTarefa = (req: Request, res: Response) => {
    const id = req.params.id;
    const body: TarefaRequestDTO = req.body;
    const tarefa = tarefas.find((tarefas) => tarefas.id === id);

    if (!tarefa) {
        return res.status(404).send({
            status: 404,
            message: 'Nenhuma tarefa encontrada',
        });
    }

    tarefa.descricao =
        body.descricao == null ? tarefa.descricao : body.descricao;
    tarefa.concluida =
        body.concluida == null ? tarefa.concluida : body.concluida;

    res.status(201).send({
        message: 'tarefa atualizada com sucesso',
        tarefa: tarefa,
    });
};

const deleteTarefa = (req: Request, res: Response) => {
    const id = req.params.id;
    const index = tarefas.findIndex((tarefa) => tarefa.id === id);

    if (index === -1) {
        res.status(404).send({
            status: 404,
            message: 'Nenhuma tarefa encontrada',
        });
        return;
    }

    tarefas.splice(index, 1);

    res.status(201).send({
        message: 'Tarefa removida com sucesso',
    });
};

export { getAllTarefas, getTarefaById, addTarefa, updateTarefa, deleteTarefa };
