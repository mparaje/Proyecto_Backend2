import express from "express";
//import { engine } from "express-handlebars";
import { join, __dirname } from "./utils/index.js";
import cookieParser from "cookie-parser";

import userRoutes from "./routes/users.routes.js";
//import viewRoutes from "./routes/views.routes.js";
import productRoutes from "./routes/products.routes.js";
import cartRoutes from "./routes/carts.routes.js";
import ticketRoutes from "./routes/tickets.routes.js";

import passport from "passport";
import initializePassport from "./config/passport.config.js";

import connectDb from "./config/database.js";
import envs from "./config/envs.js";

const app = express();

app.set("PORT", envs.port || 3000);
/*
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", join(__dirname, "views"));*/

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//app.use(express.static(join(__dirname, "public")));
app.use(cookieParser());


initializePassport();
app.use(passport.initialize());


app.get("/", (req, res) => {
  res.json({ status: "ok", message: "API Running" });
});

//Rutas API

app.use("/api/sessions", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/carts", cartRoutes);
app.use("/api/tickets", ticketRoutes);

//Rutas de vistas

//app.use("/", viewRoutes);

connectDb(envs.mongodb_url);

app.listen(app.get("PORT"), () => {
  console.log(`Server running on port ${app.get("PORT")}`);
});