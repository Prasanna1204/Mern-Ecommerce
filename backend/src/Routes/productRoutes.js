import express from "express"
import {
        createProduct,
        getProducts,
        getProductById,
        updateProduct,
        deleteProduct
    } from "../Controllers/productController.js"
import authMiddleware from "../middlewares/authMiddleware.js"
import adminMiddleware from "../middlewares/adminMiddleware.js"

const router = express.Router();
router.get("/",getProducts);

router.get("/:id", getProductById);
//not need authmiddleware because users need to browse products without login

router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  createProduct
);

router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  updateProduct
);

router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  deleteProduct
);

export default router;