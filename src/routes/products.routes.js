import { Router } from "express";
import productsController from "../controllers/products.controller.js";
import { passportAuth } from "../middlewares/passportAuth.middleware.js";
import { authorize } from "../middlewares/authorization.middleware.js";

const router = Router();

// Obtener todos los productos
router.get("/", productsController.getAll);

// Obtener un producto por ID
router.get("/:pid", productsController.getById);

// Crear un producto
router.post("/", passportAuth, authorize (["admin"]),productsController.create);

// Actualizar un producto
router.put("/:pid", passportAuth, authorize (["admin"]), productsController.update);

// Eliminar un producto
router.delete("/:pid", passportAuth, authorize (["admin"]), productsController.delete);

export default router;
