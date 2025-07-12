import express from 'express';
import {
  addProduct,
  listProduct,
  removeProduct,
  getMyUploads,
} from '../controller/productController.js';
import upload from '../middleware/multer.js';
import isAuth from '../middleware/isAuth.js'; // 🛡️ Ensure this is used
import Product from '../model/productModel.js'; // 🔁 Required for fetching product by ID

const productRoutes = express.Router();

// 🔄 Add a product (protected)
productRoutes.post(
  '/addproduct',
  isAuth,
  upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'image4', maxCount: 1 },
  ]),
  addProduct
);

// 📃 Get all products
productRoutes.get('/list', listProduct);

// 🔐 Get products uploaded by logged-in user
productRoutes.get('/myuploads', isAuth, getMyUploads);

// 📦 Get single product by ID
productRoutes.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ message: 'Product not found' });

    res.status(200).json(product);
  } catch (error) {
    console.error('Error fetching product by ID:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// ❌ Remove a product (protected)
productRoutes.post('/remove/:id', isAuth, removeProduct);

export default productRoutes;
