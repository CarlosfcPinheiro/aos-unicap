import express from 'express';
import {
    getAllProjetos, 
    getProjetoById, 
    createProjeto, 
    updateProjetoById, 
    deleteProjetoById
} from '../controller/projeto.js';

const router = express.Router();

router.get('/', getAllProjetos);
router.get('/:id', getProjetoById);
router.post('/', createProjeto);
router.put('/:id', updateProjetoById);
router.delete('/:id', deleteProjetoById);

export default router;