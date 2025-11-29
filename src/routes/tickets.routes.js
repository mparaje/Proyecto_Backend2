import { Router } from "express";
import ticketsController from "../controllers/tickets.controller.js";

const router = Router();

// Buscar ticket por código
router.get("/:code", ticketsController.getByCode);

export default router;
