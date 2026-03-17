import express from "express";
import { createUser, getUser, GoogleLogin, loginUser } from "../controllers/userControllers.js";

const userRouter = express.Router()

userRouter.post("/",createUser)
userRouter.post("/login",loginUser)
userRouter.get("/",getUser)
userRouter.post("/google-login",GoogleLogin)

export default userRouter;


