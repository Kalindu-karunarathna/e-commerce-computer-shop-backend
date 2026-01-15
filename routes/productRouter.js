import express from "express"
import { createProduct,getAllProducts,deleteProduct,updateProduct,getProductById } from "../controllers/productControllers.js"


const productRouter = express.Router()

productRouter.get("/",getAllProducts)
productRouter.get("/:productId",getProductById)
productRouter.post("/",createProduct)
productRouter.delete("/:productId",deleteProduct)
productRouter.put("/:productId",updateProduct)

//normally we should not use json request for send small amount of data like deleted product id
//so that id attach to request url
//:products means, anything after / in url store in productId variable


export default productRouter
