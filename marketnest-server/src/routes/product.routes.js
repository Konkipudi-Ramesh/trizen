import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";
import upload from "../middlewares/upload.middleware.js";

import {
  createProduct,
  getMyProducts,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getBrandDashboard,
  getProductById
} from "../controllers/product.controller.js";

const router = express.Router();

/*
PUBLIC ROUTES
*/

// Get all marketplace products
router.get("/", getAllProducts);

/*
BRAND PROTECTED ROUTES
*/

// Create product with image upload
router.post(
  "/",
  protect,
  authorizeRoles("brand"),
  upload.array("images", 5),
  createProduct
);

// Get brand products
router.get(
  "/my-products",
  protect,
  authorizeRoles("brand"),
  getMyProducts
);

// Brand dashboard statistics
router.get(
  "/dashboard",
  protect,
  authorizeRoles("brand"),
  getBrandDashboard
);

// Get single product details
router.get("/:id", getProductById);

// Update product
router.put(
  "/:id",
  protect,
  authorizeRoles("brand"),
  updateProduct
);

// Soft delete product
router.delete(
  "/:id",
  protect,
  authorizeRoles("brand"),
  deleteProduct
);

export default router;