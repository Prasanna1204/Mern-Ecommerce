import express from "express"
import {
    createOrder,
    getmyOrder,
    getOrderByID,
    updateOrderStatus
} from "../Controllers/orderController.js"
import authMiddleware from "../middlewares/authMiddleware.js"
import adminMiddleware from "../middlewares/adminMiddleware.js"

const router = express.Router();
router.post("/",authMiddleware,createOrder);
router.get("/",authMiddleware,getmyOrder);
router.get("/:id",authMiddleware,getOrderByID);
router.put("/:id",authMiddleware,adminMiddleware,updateOrderStatus);
export default router;