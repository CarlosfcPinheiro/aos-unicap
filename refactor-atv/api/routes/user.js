import { Router } from 'express';
import { 
    getAllUsers, 
    getUserById, 
    updateUserById, 
    createUser, 
    deleteUserById 
} from '../controller/user';

const router = Router();

router.get('/', getAllUsers);
router.get('/:userId', getUserById);

router.post('/', createUser);

router.put('/:userId', updateUserById);

router.delete('/:userId', deleteUserById);

export default router;
