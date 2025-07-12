import express from 'express';
import isAuth from '../middleware/isAuth.js';
import {
  allOrders,
  placeOrder,
  updateStatus,
  userOrders
} from '../controller/orderController.js';

const orderRoutes = express.Router();

// ✅ USER ROUTES
orderRoutes.post('/placeorder', isAuth, placeOrder);      
orderRoutes.get('/user', isAuth, userOrders);             

// ✅ ADMIN ROUTES (protect if needed)
orderRoutes.get('/list', allOrders);                      
orderRoutes.post('/status', updateStatus);                

export default orderRoutes;
