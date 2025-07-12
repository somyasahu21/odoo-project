import express from "express";
import isAuth from "../middleware/isAuth.js";
import { adminLogin, googleLogin, login, logout, registration,getLoggedInUser } from "../controller/authController.js";

const authRoutes = express.Router();

authRoutes.post("/registration", registration);
authRoutes.post("/login", login);
authRoutes.get("/logout", logout);
authRoutes.post("/googleLogin", googleLogin)
authRoutes.post("/adminLogin", adminLogin)
authRoutes.get("/me", isAuth, getLoggedInUser);

export default authRoutes;
