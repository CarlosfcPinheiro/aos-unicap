import { Router } from "express";
import { 
    getAllTasks, 
    getTaskById, 
    createTask, 
    updateTaskById, 
    deleteTaskById
} from "../controller/task";

const router = Router();

router.get('/', getAllTasks);
router.get('/:taskId', getTaskById);

router.post('/', createTask);

router.put('/:taskId', updateTaskById);

router.delete('/:taskId', deleteTaskById);

export default router;