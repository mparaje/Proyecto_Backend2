import { dirname, join } from "path";
import { fileURLToPath } from "url";

import envs from "../config/envs.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = envs.jwt_secret;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export { __dirname, join };

export const hashPassword = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const isValidPassword = (password, hash) => bcrypt.compareSync(password, hash);

export const createToken = (user, expires = "1h") =>
  jwt.sign(user, JWT_SECRET, { expiresIn: expires });

export const verifyToken = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        return null;
    }
};