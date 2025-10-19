import express from "express";
import {
    createFormacao,
    getAllFormacoes,
    getFormacaoById,
    updateFormacaoById,
    deleteFormacaoById
} from "../controller/formacao.js";

const router = express.Router();

router.get("/", getAllFormacoes);
router.get("/:id", getFormacaoById);
router.post("/", createFormacao);
router.put("/:id", updateFormacaoById);
router.delete("/:id", deleteFormacaoById);

export default router;