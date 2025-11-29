import passport from "passport";
import jwt from "passport-jwt";
import envs from "../config/envs.js";
import { userRepository } from "../repositories/index.js";

const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

const initializePassport = () => {
  passport.use(
    "jwt",
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: envs.jwt_secret,
      },
      async (jwt_payload,done) => {
        try{
          const user = await userRepository.getUserById(jwt_payload._id);
          if (!user) return done(null, false);
          return done(null, user);
        } catch(error){
          return done(error)
        }
      }
    )
  )
};

const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["authCookie"];
  }

  return token;
};

export default initializePassport;


