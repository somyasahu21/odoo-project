import User from '../model/userModel.js';

export const addtoCart = async (req, res) => {
  try {
    const { itemId, member } = req.body;

    if (!req.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    if (!itemId || !member) {
      return res.status(400).json({ message: "itemId and member are required" });
    }

    const userData = await User.findById(req.userId);
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    const cartData = userData.cartData || {};

    if (!cartData[itemId]) {
      cartData[itemId] = {};
    }

    cartData[itemId][member] = (cartData[itemId][member] || 0) + 1;

    await User.findByIdAndUpdate(req.userId, { $set: { cartData } });

    return res.status(201).json({ message: "Added to cart" });
  } catch (error) {
    console.error("addToCart error:", error);
    return res.status(500).json({ message: "Server error in addToCart" });
  }
};

export const updateCart = async (req, res) => {
  try {
    const { itemId, member, quantity } = req.body;

    if (!req.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    if (!itemId || !member || typeof quantity !== 'number') {
      return res.status(400).json({ message: "itemId, member, and valid quantity are required" });
    }

    const userData = await User.findById(req.userId);
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    const cartData = userData.cartData || {};
    if (!cartData[itemId]) {
      cartData[itemId] = {};
    }

    cartData[itemId][member] = quantity;

    await User.findByIdAndUpdate(req.userId, { $set: { cartData } });

    return res.status(200).json({ message: "Cart updated" });
  } catch (error) {
    console.error("updateCart error:", error);
    return res.status(500).json({ message: "Server error in updateCart" });
  }
};

export const getUserCart = async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userData = await User.findById(req.userId);
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(userData.cartData || {});
  } catch (error) {
    console.error("getUserCart error:", error);
    return res.status(500).json({ message: "Server error in getUserCart" });
  }
};
