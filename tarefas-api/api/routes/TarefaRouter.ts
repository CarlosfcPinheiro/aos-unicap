import { Router } from 'express';
import {
    getAllTarefas,
    getTarefaById,
    addTarefa,
    deleteTarefa,
    updateTarefa,
} from '../controllers/TarefaController';

const router = Router();

router.get('/', getAllTarefas);
router.get('/:id', getTarefaById);
router.post('/', addTarefa);
router.put('/:id', updateTarefa);
router.delete('/:id', deleteTarefa);

export { router };
