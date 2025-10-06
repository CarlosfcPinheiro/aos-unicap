import { authLogin } from "../controller/auth";
import { Router } from "express";

const router = Router();

router.post('/login', authLogin);

export default router;