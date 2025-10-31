import dotenv from "dotenv";
dotenv.config();

export default {
  port: process.env.PORT || 3030,
  mongodb_url: process.env.MONGO_URL,
  jwt_secret: process.env.JWT_SECRET,
};
