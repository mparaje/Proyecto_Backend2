import { userRepository } from "../repositories/index.js";
import { hashPassword, isValidPassword, createToken } from "../utils/index.js";
import UserDTO from "../dto/user.dto.js";
import sendRecoveryEmail from "../config/nodemailer.js"
import crypto from "crypto"

class UserController {
  // REGISTER

  async register(req, res) {
    try {
      const { first_name, last_name, email, age, password } = req.body;

      const exist = await userRepository.getUserByEmail(email);
      if (exist)
        return res.status(400).json({ message: "El email ingresado ya esta registrado" });

      const newUser = await userRepository.createUser({
        first_name,
        last_name,
        email,
        age,
        password: hashPassword(password),
      });

      return res.status(201).json({
        status: "success",
        message: "User registrado correctamente", 
        newUser
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // LOGIN
  async login(req, res) {
    try {
      const { email, password } = req.body;

      const user = await userRepository.getUserByEmail(email);
      if (!user)
        return res.status(404).json({ message: "Usuario no encontrado" });

      if (!isValidPassword(password, user.password))
        return res.status(401).json({ message: "Credenciales incorrectas" });

      const token = createToken(
        {
          _id: user._id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          role: user.role,
        },
        "1h"
      );

      res.cookie("authCookie", token, { httpOnly: true, maxAge: 3600000 });

      return res.status(200).json({status: "success", message: "Usuario logueado correctamente", user, token});

    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // CURRENT (DTO)
  async current(req, res) {
    try {
      const dto = new UserDTO(req.user);
      res.json(dto);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async forgotPassword(req, res) {
    try {
      const { email } = req.body;

      const user = await userRepository.getUserByEmail(email);
      if (!user) return res.status(404).json({ message: "Email no encontrado" });

      const token = crypto.randomBytes(20).toString("hex")

      const expires = Date.now() + 3600000

      await userRepository.setPasswordResetToken(email, token, expires);

      await sendRecoveryEmail(email, token);

      return res.status(200).json({status: "success", message: "Se envio el mail correctamente",});
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async resetPassword (req, res) {
    const {token} = req.params;
    const {password} = req.body;

    try {
      const user = await userRepository.getUserByResetToken(token);

      if (!user)
        return res
          .status(400)
          .json({ message: "El enlace es inválido o expiró" });

      const isSame = isValidPassword(password, user.password);
      if (isSame)
        return res
          .status(400)
          .json({ message: "La nueva contraseña no puede ser igual a la anterior" });

      const hashedPass = hashPassword(password);

      await userRepository.updatePassword(user._id, hashedPass);

      return res.status(200).json({message: "Se restablecio la contraseña correctamente"});
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async logout (req,res)
  {
    res.clearCookie("authCookie");
    res.status(200).json({message: "Se cerró sesión correctamente"})
  }
}

export default new UserController();
