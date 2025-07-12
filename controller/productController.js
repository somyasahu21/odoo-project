import uploadOnCloudinary from "../config/cloudinary.js";
import Product from "../model/productModel.js";

/**
 * Add a new product (with cloud upload)
 */
export const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, subCategory, member } = req.body;

    // Upload images to Cloudinary
    const image1 = req.files?.image1 ? await uploadOnCloudinary(req.files.image1[0].path) : null;
    const image2 = req.files?.image2 ? await uploadOnCloudinary(req.files.image2[0].path) : null;
    const image3 = req.files?.image3 ? await uploadOnCloudinary(req.files.image3[0].path) : null;
    const image4 = req.files?.image4 ? await uploadOnCloudinary(req.files.image4[0].path) : null;

    // Build product data
    const productData = {
      name,
      description,
      price: Number(price),
      category,
      subCategory,
      member: member ? JSON.parse(member) : [],
      image1,
      image2,
      image3,
      image4,
      uploadedBy: req.userId, // ✅ Attach logged-in user ID
    };

    const newProduct = await Product.create(productData);

    return res.status(201).json(newProduct);
  } catch (error) {
    console.error("AddProduct error:", error);
    return res.status(500).json({ message: `AddProduct error: ${error.message}` });
  }
};

/**
 * Get all products
 */
export const listProduct = async (req, res) => {
  try {
    const products = await Product.find({}).sort({ createdAt: -1 });
    return res.status(200).json(products);
  } catch (error) {
    console.error("ListProduct error:", error);
    return res.status(500).json({ message: `ListProduct error: ${error.message}` });
  }
};

/**
 * Get products uploaded by current user
 */
export const getMyUploads = async (req, res) => {
  try {
    const products = await Product.find({ uploadedBy: req.userId }).sort({ createdAt: -1 });
    return res.status(200).json(products);
  } catch (error) {
    console.error("MyUploads error:", error);
    return res.status(500).json({ message: `MyUploads error: ${error.message}` });
  }
};

/**
 * Remove product by ID
 */
export const removeProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    return res.status(200).json(product);
  } catch (error) {
    console.error("RemoveProduct error:", error);
    return res.status(500).json({ message: `RemoveProduct error: ${error.message}` });
  }
};
