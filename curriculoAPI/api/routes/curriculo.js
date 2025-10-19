import express from 'express';
import { 
    getAllCurriculos,
    getCurriculoById,
    createCurriculo,
    updateCurriculoById, 
    deleteCurriculoById 
} from '../controller/curriculo.js';

const router = express.Router();

router.get('/', getAllCurriculos);
router.get('/:id', getCurriculoById);
router.post('/', createCurriculo);
router.put('/:id', updateCurriculoById);
router.delete('/:id', deleteCurriculoById);

export default router;