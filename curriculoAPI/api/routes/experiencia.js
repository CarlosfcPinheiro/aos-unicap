import express from "express";
import {
    createExperiencia,
    getAllExperiencias,
    getExperienciaById,
    updateExperienciaById,
    deleteExperienciaById
} from "../controller/experiencia.js";

const router = express.Router();

router.get("/", getAllExperiencias);
router.get("/:id", getExperienciaById);
router.post("/", createExperiencia);
router.put("/:id", updateExperienciaById);
router.delete("/:id", deleteExperienciaById);

export default router;