import Order from "../models/Order.js"
import Cart from "../models/Cart.js"
import Product from "../models/Product.js"

export const createOrder = async(req,res)=>{
    try{
        const cart = await Cart.findOne({
            userID: req.user.id
        }).populate("items.productID");

        if(!cart){
            return res.status(404).json({
                message: "cart not found"
            })
        }
        if(cart.items.length === 0){
            return res.status(404).json({
                message: "cart is empty"
            })
        }

        for (const item of cart.items) {
        const product = await Product.findOneAndUpdate(
            {
                _id: item.productID._id,
                stock: { $gte: item.quantity }
            },
            {
                $inc: {
                    stock: -item.quantity
                }
            },
            {
                new: true
            }
        );
        if (!product) {
            return res.status(400).json({
                message: "Insufficient stock"
            });
        }
    }
        let Amount = 0
        cart.items.forEach(item=>{
            Amount += item.productID.price * item.quantity;
        });
        const order = await Order.create({
            userID: req.user.id,
            items: cart.items,
            totalAmount: Amount,
            paymentStatus: "completed"
        })
        cart.items = []
        await cart.save();
        res.status(201).json({
            message: "Order Created",
            order
        })

    }catch(error){
        return res.status(500).json({
            message: error.message
        })
    }
}

export const getmyOrder = async(req,res)=>{
    try{
        const orders = await Order.find({
            userID: req.user.id
        })
        if(!orders){
            return res.status(404).json({
                message: "No orders Placed"
            })
        }
        res.status(200).json({
            success: true,
            orders
        })
    }catch(error){
        return res.status(500).json({
            message: error.message
        })
    }
}

export const getOrderByID = async(req,res)=>{
    try{
        const order = await Order.findById(req.params.id);
        if(!order){
            return res.status(404).json({message:"Order not found"});
        }
        res.status(200).json(order);
    }catch(error){
        return res.status(500).json({
            message: error.message
        })
    }
}
export const updateOrderStatus = async(req,res)=>{
    try{
        const {status} = req.body;
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            {status},
            {
                new:true,
                runValidators: true
            }
        );
        if (!order) {
                return res.status(404).json({
                    message: "Order not found"
                });
            }
            res.status(200).json({
                message: "Order updated successfully",
                order
            });
    }catch (error){
        res.status(500).json({
            message: error.message
        });
    }
}
