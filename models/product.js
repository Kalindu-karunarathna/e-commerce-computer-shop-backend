import mongoose from "mongoose";


const productSchema = new mongoose.Schema(
    {
        productId : {
            type : String,
            unique : true,
            required : true
        },
        name : {
            type : String,
            required : true
        },
        altNames : {
            type : [String],
            default : []
        },
        description : {
            type : String,
            required : true
        },
        price : {
            type : Number,
            required : true
        },
        labelPrice : {
            type : Number,
            required : true
        },
        images : {
            type : [String],
            required : true
        },
        category : {
            type : String,
            required : true
        },
        brand : {
            type : String,
            required : true,
            default : "no brand"
        },
        stock : {
            type : Number,
            required : true,
            default : 0
        },
        isAvailable : {
            type : Boolean,
            default : true
        }
    }
)

//connect schema with database collection
const Product = mongoose.model("Product",productSchema)

export default Product