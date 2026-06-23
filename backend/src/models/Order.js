import mongoose from "mongoose";
const orderSchema = new mongoose.Schema({
    userID:{
        type :mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true,
    },
    items:[{
        productID:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
        },
    ],
    totalAmount: {
        type: Number,
        required: true,
    },
    paymentStatus: {
        type : String,
        enum : ["pending", "completed", "failed"],
        default : "pending",
    }
},
{
    timestamps : true,
}
);
const Order = mongoose.model("Order", orderSchema);
export default Order;