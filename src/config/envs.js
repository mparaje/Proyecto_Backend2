import dotenv from "dotenv";
dotenv.config();

export default {
  port: process.env.PORT || 3000,
  mongodb_url: process.env.MONGO_URL,
  jwt_secret: process.env.JWT_SECRET,
  gmail_user: process.env.GMAIL_USER,
  gmail_pass: process.env.GMAIL_PASS,
  base_url: process.env.BASE_URL
};
