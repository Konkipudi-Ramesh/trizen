import Product from "../models/product.model.js";
import cloudinary from "../config/cloudinary.js";

// CREATE PRODUCT
export const createProduct = async (req, res) => {
  try {
    const { title, description, price, category, status } = req.body;

    let imageUrls = [];
        if (!title || !price || !category) {
  return res.status(400).json({
    message: "Title, price and category are required"
  });
}
    // Upload images to Cloudinary
    if (req.files && req.files.length > 0) {
      for (let file of req.files) {
        const result = await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "marketnest" },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          );
          stream.end(file.buffer);
        });

        imageUrls.push(result.secure_url);
      }
    }

    const product = await Product.create({
      title,
      description,
      price,
      category,
      status,
      brand: req.user._id,
      images: imageUrls
    });

    res.status(201).json(product);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// GET MY PRODUCTS
export const getMyProducts = async (req, res) => {
  try {

    const products = await Product.find({
      brand: req.user._id,
      isDeleted: false
    }).sort({ createdAt: -1 });

    res.json(products);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE PRODUCT
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product || product.isDeleted) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.brand.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to edit this product" });
    }

    const allowedFields = [
  "title",
  "description",
  "price",
  "category",
  "status"
];

const updates = {};

allowedFields.forEach(field => {
  if (req.body[field] !== undefined) {
    updates[field] = req.body[field];
  }
});

const updatedProduct = await Product.findByIdAndUpdate(
  req.params.id,
  updates,
  { new: true }
);

    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// SOFT DELETE PRODUCT
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product || product.isDeleted) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.brand.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this product" });
    }

    product.isDeleted = true;
    await product.save();

    res.json({ message: "Product archived successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUBLIC MARKETPLACE
export const getAllProducts = async (req, res) => {
  try {
    const { search, category, page = 1, limit = 5 } = req.query;

    const query = {
      status: "published",
      isDeleted: false
    };

    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    if (category) {
      query.category = category;
    }

    const pageNumber = Number(page);
const limitNumber = Number(limit);

const skip = (pageNumber - 1) * limitNumber;

    const products = await Product.find(query)
      .skip(skip)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    const total = await Product.countDocuments(query);

    res.json({
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
      products
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// BRAND DASHBOARD
import mongoose from "mongoose";

export const getBrandDashboard = async (req, res) => {
  try {

    const brandId = new mongoose.Types.ObjectId(req.user._id);

    const stats = await Product.aggregate([
      {
        $match: {
          brand: brandId,
          isDeleted: false
        }
      },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 }
        }
      }
    ]);

    let summary = {
      total: 0,
      published: 0,
      draft: 0,
      archived: 0
    };

    stats.forEach(item => {
      summary[item._id] = item.count;
      summary.total += item.count;
    });

    res.json(summary);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getProductById = async (req, res) => {
  try {

    const product = await Product.findOne({
  _id: req.params.id,
  status: "published",
  isDeleted: false
});

    if (!product || product.isDeleted) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.json(product);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};