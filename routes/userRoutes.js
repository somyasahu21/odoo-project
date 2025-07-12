import express from "express";
import isAuth from "../middleware/isAuth.js";
import { getCurrentUser } from "../controller/userController.js";

const userRoutes = express.Router();

// Use GET method and lowercase path
userRoutes.get("/getcurrentuser", isAuth, getCurrentUser);

export default userRoutes;
