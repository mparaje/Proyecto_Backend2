import { dirname, join } from "path";
import { fileURLToPath } from "url";
import envs from "../config/envs.js";
import { hashSync, genSaltSync, compareSync } from "bcrypt";
import jwt from "jsonwebtoken";

const jwt_secret = envs.jwt_secret;
const __filename = fileURLToPath(import.meta.url);
const __dirname = join(dirname(__filename), "..");

export const hashPassword = (password) => hashSync(password, genSaltSync(10));

export const isValidPassword = (password, hash) => compareSync(password, hash);

export const createToken = (user, expires) =>
  jwt.sign(user, jwt_secret, { expiresIn: expires });

export const verifyToken = (token) => {
    try {
        return jwt.verify(token, jwt_secret);
    } catch (error) {
        return null;
    }
};

export { join, __dirname };