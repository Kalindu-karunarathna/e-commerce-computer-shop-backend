import express from "express"
import { createOrder, getOrders, UpdateOrderStatus } from "../controllers/orderControllers.js"

const orderRouter = express.Router();

orderRouter.post("/",createOrder);
orderRouter.get("/",getOrders); 
orderRouter.put("/:orderId",UpdateOrderStatus);

export default orderRouter;