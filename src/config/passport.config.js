
import userModel from "../models/user.model.js";
import cartModel from "../models/cart.model.js";
import { hashPassword, isValidPassword, createToken } from "../utils/index.js";
import passport from "passport";
import jwt from "passport-jwt";
import local from "passport-local"
import envs from "../config/envs.js";

const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;


const LocalStrategy = local.Strategy;

const initializePassport = () => {
  passport.use(
    "register",
    new LocalStrategy(
      {
        passReqToCallback: true,
        usernameField: "email",
      },
      async( req, email, password, done) => {
        const{first_name, last_name, age} = req.body
        try{
          const userExist = await userModel.findOne({email})
          if (userExist){
            return done(null, false, {message: "El usuario ya existe"});
          }
          const newCart = await cartModel.create({ products: [] });
          const newUser = await userModel.create({
            first_name,
            last_name,
            email,
            age,
            password: hashPassword(password),
            cart: newCart._id,
            role:"user",
          })

          return done(null,newUser);
        }
        catch (error){
          return done(error);
        }
      })
  );
  passport.use(
    "login",
    new LocalStrategy (
      {
        usernameField: "email",
      },
      async(email,password,done)=>{
        try{
          const user = await userModel.findOne({ email });
          if (!user) return done(null, false, { message: "Usuario no encontrado" });

          const validPassword = isValidPassword(password, user.password);
          if (!validPassword) return done(null, false, { message: "Contraseña incorrecta" });

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

          return done(null, {user,token});

      } catch (error) {
        return done(error)
      }
    })
  );

  passport.use(
    "jwt",
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: envs.jwt_secret,
      },
      async (jwt_payload,done) => {
        try{
          const user = await userModel.findById(jwt_payload.user.id);
          if (!user) return done(null, false);
          return done(null, user);
        } catch(error){
          return done(error)
        }
      }
    )
  )

  passport.serializeUser((user, done) => {
    return done(null, user._id);
  });
  passport.deserializeUser(async (id, done) => {
    const user = await userModel.findById(id);
    return done(null, user);
  });
};

const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["authCookie"];
  }

  return token;
};

export default initializePassport;


