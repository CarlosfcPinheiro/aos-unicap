import express from 'express';
import {
    createUsuario, 
    getAllUsuarios, 
    getUsuarioById, 
    updateUsuarioById, 
    deleteUsuarioById 
} from '../controller/usuario.js';

const router = express.Router();

router.get('/', getAllUsuarios);
router.get('/:id', getUsuarioById);
router.post('/', createUsuario);
router.put('/:id', updateUsuarioById);
router.delete('/:id', deleteUsuarioById);

export default router;