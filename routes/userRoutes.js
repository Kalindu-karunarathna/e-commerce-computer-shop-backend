import express from "express";
import { createUser, getUser, GoogleLogin, loginUser, validateOtpAndUpdatePassword,sendOTP, getAllUsers, toggleBlockUser } from "../controllers/userControllers.js";

const userRouter = express.Router()

userRouter.post("/",createUser)
userRouter.post("/login",loginUser)
userRouter.get("/",getUser)
userRouter.post("/google-login",GoogleLogin)
userRouter.post("/send-otp",sendOTP)
userRouter.post("/validate-otp",validateOtpAndUpdatePassword)
userRouter.get("/all",getAllUsers)
userRouter.put("/toggle-block/:id",toggleBlockUser)

export default userRouter;


