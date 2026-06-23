import Product from "../models/Product.js";


export const createProduct = async(req,res) =>{
    try{
        const {name,description,price,stock,category,images} = req.body;
        const newProduct = await Product.create({
            name,
            description,
            price,
            stock,
            category,
            images,
        });
        res.status(201).json({
            message: "Product Created Successfully",
            product: newProduct,
        })
    }catch(error){
        res.status(500).json({message: error.message});
    }
}
export const getProducts = async(req,res) =>{
    try{
        const products = await Product.find();
        res.status(200).json({
            success: true, //I added this to indicate that the request was successful
            count: products.length,
            products,
        })
    }catch(error){
        return res.status(500).json({message: error.message});
    }
}
export const getProductById = async(req,res) =>{
    try{
        const product = await Product.findById(req.params.id);
        if(!product){
            return res.status(404).json({
                message: "Product not found"
            })
        }
        res.status(200).json({
            success: true,
            product, // Return the product object directly
        })
    }catch(error){
        return res.status(500).json({message: error.message});
    }
}
export const updateProduct = async(req,res) =>{
    try{
        const updatedProduct = await Product.findByIdAndUpdate( //Find the product by its ID and update it with the new data. if no product is found, it will return null.
            req.params.id,
            req.body,
    {
        new:true, //Return the updated document, not the old one.
        runValidators:true, //Run schema validators on the update operation.
    }
);
    if(!updatedProduct){
            return res.status(404).json({
                message: "Product not found"
            })
        }
    res.status(200).json({
        message: "Product updated successfully",
        product: updatedProduct,
    })
}catch(error){
    return res.status(500).json({message: error.message});
}
}
export const deleteProduct = async(req,res) =>{
    try{
        const product = await Product.findByIdAndDelete(req.params.id); //Find the product by its ID and delete it. if no product is found, it will return null.
        if(!product){
            return res.status(404).json({
                message: "Product not found"
            })
        }
        res.status(200).json({
            message: "Product deleted successfully",
        })
        }catch(error){
        return res.status(500).json({message: error.message});
        }
}

