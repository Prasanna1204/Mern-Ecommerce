import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    id: {
        type : String,
        required : true,
    },
    name: {
        type : String,
        required : true,
        trim : true,
    },
    description: {
        type : String,
        required : true,
        trim : true,
    },
    price: {
        type : Number,
        required : true,
    },
    stock: {
        type : Number,
        required : true,
    },
    category:{
        type : String,
        required : true,
    },
    images:[{
        type : String
    }]
},
    {
        timestamps : true,
    }
);
const Product = mongoose.model("Product", productSchema);
export default Product;