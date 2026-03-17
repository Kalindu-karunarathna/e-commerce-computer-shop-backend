import express from "express";
import { createUser, getUser, GoogleLogin, loginUser, validateOtpAndUpdatePassword } from "../controllers/userControllers.js";

const userRouter = express.Router()

userRouter.post("/",createUser)
userRouter.post("/login",loginUser)
userRouter.get("/",getUser)
userRouter.post("/google-login",GoogleLogin)
userRouter.get("/send-otp/:email",sendOTP)
userRouter.post("/validate-otp",validateOtpAndUpdatePassword)

export default userRouter;


