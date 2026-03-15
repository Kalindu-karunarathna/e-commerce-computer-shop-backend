import express from "express";
import { createUser, getUser, loginUser } from "../controllers/userControllers.js";

const userRouter = express.Router()

userRouter.post("/",createUser)
userRouter.post("/login",loginUser)
userRouter.get("/",getUser)

export default userRouter;


