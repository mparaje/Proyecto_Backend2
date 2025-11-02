import { Router } from "express";
import userModel from "../models/user.model.js";
import cartModel from "../models/cart.model.js";
import { hashPassword, isValidPassword, createToken } from "../utils/index.js";

const router = Router();


router.post("/register", async (req, res) => {
  try {
    const { first_name, last_name, email, age, password } = req.body;

    const userExist = await userModel.findOne({ email });
    if (userExist)
      return res.status(400).json({ message: "El correo ya está registrado" });

    const newCart = await cartModel.create({ products: [] });

    const newUser = {
      first_name,
      last_name,
      email,
      age,
      password: hashPassword(password),
      cart: newCart._id,
    };

    await userModel.create(newUser)

    res.status(201).redirect("/login?register=success");

  } catch (error) {
    res.status(500).json({
      message: "Error interno del servidor",
      error: error.message,
    });
  }
});


router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const userExist = await userModel.findOne({ email });
    if (!userExist) return res.status(404).render("login", { error: "Usuario no encontrado" });

    const validPassword = isValidPassword(password, userExist.password);
    if (!validPassword) return res.status(401).render("login", { error: "Credenciales incorrectas" });

    const token = createToken(
      {
        _id: userExist._id,
        first_name: userExist.first_name,
        last_name: userExist.last_name,
        email: userExist.email,
        role: userExist.role,
        cart: userExist.cart,
      },
      "1h"
    );

    res
      .cookie("authCookie", token, { httpOnly: true, maxAge: 3600000 })
      .redirect("/profile");
  } catch (error) {
      console.error("Error al iniciar sesión:", error.message);
      res.status(500).render("login", {
        error: "Error interno del servidor",
      });
  }
});

router.post("/recupero", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    user.password = hashPassword(password);
    await user.save();

    res.redirect("/login?recupero=success");
  } catch (error) {
    res.status(500).json({
      message: "Error al recuperar la contraseña",
      error: error.message,
    });
  }
});


router.post("/logout", (req, res) => {
  res.clearCookie("authCookie");
  res.redirect("/login?logout=success");
});

export default router;