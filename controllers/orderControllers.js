import Order from "../models/order.js";
import Product from "../models/product.js";

export async function createOrder(req,res){

    if(req.user==null){
        res.status(401).json({
            message:"unauthorized"
        });
        return;
    }

    try{
        const latestOrder = await Order.findOne().sort({date:-1});

        let orderId = "ORD000001"

        if(latestOrder!=null){
            let latestOrderId = latestOrder.orderId;
            let latestOrderNumberString = latestOrderId.replace("ORD","");
            let latestOrderNumber = parseInt(latestOrderNumberString);

            let newOrderNumber = latestOrderNumber+1;
            let newOrderNumberString = newOrderNumber.toString().padStart(6,"0");

            orderId = "ORD"+newOrderNumberString;
        }

        const items = [];
        let total = 0;

        for(i=0;i<req.body.items.length;i++){

            const product = await Product.findOne({productId:req.body.items[i].productId});

            if(product==null){
                return res.status(400).json({
                    message:`product with id ${req.body.items[i].productId} not found.`
                })
            }

            //check if stock is available
            /* if(product.stock<req.body.items[i].quantity){
                return res.status(400).json({
                    message:`Only ${product.stock} items available for product id ${req.body.items[i].productId}`
                })
            } *///integrate this later

            items.push({
                productId:product.productId,
                name:product.name,
                price:product.price,
                quantity:req.body.items[i].quantity,
                image:product.images[0]
            })
            total+=product.price*req.body.items[i].quantity;
        }

        let name = req.body.name;
        if(name==null){
            name=req.user.firstName+" "+req.user.lastName;
        }

        const newOrder = new Order({
            orderId:orderId,
            email:req.user.email,
            name:name,
            address:req.body.address,
            total:total,
            items:items,
            phone:req.body.phone
        })

        await newOrder.save()

        /* for(let i=0;i<items.length;i++){
            await Product.updateOne(
                {productId:items[i].productId},
                {$inc:{stock:-items[i].quantity}}
            )
        } *///try to integrate later, function for reduce stock when user place an order

        return res.json({
            message:"order placed successfully",
            orderId:orderId
        });

    }catch(error){
        return res.status(500).json({
            message:"error placing order",
            error:error.message,
        })
    }
}