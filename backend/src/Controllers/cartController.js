import Cart from "../models/Cart.js"
import Product from "../models/Product.js";

export const addProduct = async (req,res)=>{
    try{
        const{productID,quantity} = req.body;
        const product = await Product.findById(productID);
        if(!product){
            return res.status(404).json({message: "Product Not found"});
        }
        let cart = await Cart.findOne({
            userID: req.user.id
        });
        if(!cart){
            cart = await Cart.create({
                userID: req.user.id,
                items: [
                    {
                        productID,
                        quantity
                    }
                ]
            })
        }else{
            cart.items.push({
                productID,
                quantity
            })
        await cart.save();
        }
        res.status(200).json({
            message: "Product added to cart",
            cart
        })
    }catch(error){
        res.status(500).json({
            message: error.message
        })
    }
}

export const getCart= async(req,res)=>{
    try{
        const cart = await Cart.findOne({
            userID: req.user.id
        })
        .populate("items.productID")
        if(!cart){
            return res.status(404).json({
                message: "cart not found"
            })
        }
        res.status(200).json({
            success: true,
            cart
        })
    }
    catch(error){
        return res.status(500).json({
            message: error.message
        })
    }
}
export const updateCart = async(req,res)=>{
    try{
        const {productID, quantity} = req.body;
        const cart = await Cart.findOne({
            userID: req.user.id
        })
        if(!cart){
            return res.status(404).json({
                message: "cart not found"
            })
        }
        const item = cart.items.find(
            item=> item.productID.toString() === productID
        );
        if(!item){
            return res.status(404).json({
                message: "Product not found in the cart"
            })
        }
        item.quantity = quantity;
        await cart.save();
        res.status(200).json({
            message: "Cart updated Successfully",
            cart
        })
    }catch(error){
        return res.status(500).json({
            message: error.message
        })
    }
}
export const deleteCart = async(req,res)=>{
     try{
        const {productID} = req.body;
        const cart = await Cart.findOne({
            userID: req.user.id
        })
        if(!cart){
            return res.status(404).json({
                message: "cart not found"
            })
        }
        cart.items = cart.items.filter(
            item=> item.productID.toString() !== productID
        );
        await cart.save();
        res.status(200).json({
            message: "Product removed successfully",
            cart
        })
    }catch(error){
        return res.status(500).json({
            message: error.message
        })
    }

}