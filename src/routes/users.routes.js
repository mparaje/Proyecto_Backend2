import { Router } from "express";
import userController from "../controllers/users.controller.js";
import { passportAuth } from "../middlewares/passportAuth.middleware.js";

const router = Router();

router.post("/register", userController.register); 
router.post("/login", userController.login);
router.get("/current", passportAuth, userController.current);

router.post("/forgot-password", userController.forgotPassword)
router.get("/reset-password/:token", (req, res) => {
  const { token } = req.params;
  res.render("reset-password", { token });
});

router.post("/reset-password/:token", userController.resetPassword);

router.get("/logout", userController.logout);

export default router;
