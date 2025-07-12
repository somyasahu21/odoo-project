import express from 'express';
import { addtoCart, getUserCart, updateCart } from '../controller/cartController.js';
import isAuth from '../middleware/isAuth.js';

const cartRoutes = express.Router();

// Get user's cart (use GET)
cartRoutes.get('/get', isAuth, getUserCart);

// Add item to cart (use POST)
cartRoutes.post('/add', isAuth, addtoCart);

// Update cart quantity (use PUT or PATCH)
cartRoutes.put('/update', isAuth, updateCart);

export default cartRoutes;
