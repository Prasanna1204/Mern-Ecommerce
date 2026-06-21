import express from "express"
import {
    addProduct,
    getCart,
    updateCart,
    deleteCart
} from "../Controllers/cartController.js"
import authMiddleware from "../middlewares/authMiddleware.js"

const router = express.Router();

router.post("/",authMiddleware,addProduct);
router.get("/",authMiddleware,getCart);
router.put("/:productID",authMiddleware,updateCart);
router.delete("/:productID",authMiddleware,deleteCart);

export default router;
