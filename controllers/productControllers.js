import Product from "../models/product.js"
import { isAdmin } from "./userControllers.js"


//function for create product
export function createProduct(req,res){

    //if user is not a admin, then not allowed for create products
    //isAdmin() is a function create in userControllers.js
    if(!isAdmin(req)){
        res.status(403).json({
            message : "Forbidden"
        })
        return
    }

    const product = new Product(req.body) //create product object

    product.save().then( //save product in database
        ()=>{
            res.json({
                message : "product save successfully."
            })
        }).catch(       //detect if there is any failure or error in server while save product
            (error)=>{
                res.status(500).json({
                    message : "error creating product",
                    error : error.message
                })
            }
        )
    
}


//function for get products
export function getAllProducts(req,res){

    if(isAdmin(req)){   //get products for admin
        Product.find().then(
            (products)=>{
                res.json(products)
            }
        ).catch(    //detect error in server
            (error)=>{
                res.status(500).json({
                    message:"error fetching products",
                    error:error.message
                })
            }
        )
    }
    //get products for users
    else{
        Product.find({isAvailable : true}).then(
            (products)=>{
                res.json(products)
            }
        ).catch(    //detect error in server
            (error)=>{
                res.status(500).json({
                    message:"error fetching products",
                    error:error.message
                })
            }
        )
    }
}


//function for delete products 
export function deleteProduct(req,res){
    //check whether only admin is try to delete products
    if(!isAdmin(req)){
        res.status(403).json({
            message : "only admin can delete products"
        })
        return
    }

    const productId = req.params.productId //req.params.productId means,in req url, value attach to productId variable

    Product.deleteOne({productId:productId}).then(
        ()=>{
            res.json({
                message : "product deleted successfully"
            })
        }
    )
}


//function for update product
export function updateProduct(req,res){
    if(!isAdmin(req)){
        res.status(403).json({
            message : "only admin can update products"
        })
        return
    }

    const productId = req.params.productId

    Product.updateOne({productId:productId},req.body).then(
        ()=>{
            res.json({
                message : "product update successfully"
            })
        }
    )

}


//function for get product
export function getProductById(req,res){
    const productId = req.params.productId

    Product.findOne({productId:productId}).then(
        (product)=>{
            if(product==null){
                res.status(404).json({
                    message : "product not found"
                })
            }
            else{
                if(product.isAvailable){
                    res.json(product)
                }
                else{
                    if(isAdmin(req)){
                        res.json(product)
                    }
                    else{
                        res.status(404).json({
                            message:"product not found"
                        })
                    }
                }
            }
        }
    ).catch(
        (error)=>{
            res.status(500).json({
                message : "error fetching product",
                error : error.message
            })
        }
    )
} 