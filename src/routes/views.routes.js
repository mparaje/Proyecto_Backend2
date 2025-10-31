import { Router } from "express";
import { verifyToken } from "../utils/index.js";
import userModel from "../models/user.model.js";

const router = Router();

//Verifica el token
const authMiddleware = (req, res, next) => {
  const token = req.cookies?.authCookie;
  if (!token) return res.redirect("/login");

  const decoded = verifyToken(token);
  if (!decoded) return res.redirect("/login");

  req.user = decoded;
  next();
};

//vista home 

router.get("/", (req, res) => {
  res.render("home");
});

// vista de registro
router.get("/register", (req, res) => {
  res.render("register");
});

// vista de login
router.get("/login", (req, res) => {
  const logoutSuccess = req.query.logout === "success"
  const registerSuccess = req.query.register === "success";
  res.render("login", {logoutSuccess, registerSuccess});
});

// vista perfil autenticado y su carrito

router.get("/profile", authMiddleware, async(req, res) => {
  try {
    const user = await userModel
      .findById(req.user._id)
      .populate("cart")
      .lean();

    const cartItemsCount = user.cart?.products?.length || 0;

    res.render("profile", { 
      user: {
        ...req.user,
        cartId: user.cart?._id || "Sin carrito",
        cartItemsCount
      }
    });
  } catch (error) {
    console.error("Error al cargar el perfil:", error);
    res.render("profile", { user: req.user });
  }
});

//vista recupero de contraseña

router.get("/recupero", (req, res) => {
  res.render("recupero", { title: "Recuperar password" });
});

export default router;
