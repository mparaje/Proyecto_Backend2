import { Router } from "express";
import cartsController from "../controllers/carts.controller.js";
import { passportAuth } from "../middlewares/passportAuth.middleware.js";
import { authorize } from "../middlewares/authorization.middleware.js";

const router = Router();

// Crear carrito
router.post("/", cartsController.create);

// Obtener carrito
router.get("/:cid", cartsController.getById);

// Agregar producto al carrito
router.post("/:cid/product/:pid", passportAuth, authorize(["user"]), cartsController.addProduct);

// Actualizar cantidad de un producto del carrito
router.put(
  "/:cid/product/:pid",
  passportAuth,
  authorize(["user"]),
  cartsController.updateProductQuantity
);

// Eliminar un producto específico del carrito
router.delete(
  "/:cid/product/:pid",
  passportAuth,
  authorize(["user"]),
  cartsController.removeProduct
);

// Vaciar carrito
router.delete("/:cid", cartsController.emptyCart);

// Finalizar compra
router.post(
  "/:cid/purchase",
  passportAuth, authorize(["user"]),
  cartsController.purchase
);

export default router;
