import { Router } from 'express';
import { 
    getAllMessages, 
    getMessageById, 
    createMessage, 
    updateMessageById, 
    deleteMessageById 
} from '../controller/message.js';

const router = Router();

router.get('/', getAllMessages);
router.get('/:messageId', getMessageById);

router.post('/', createMessage);

router.put('/:messageId', updateMessageById);

router.delete('/:messageId', deleteMessageById);

export default router;
