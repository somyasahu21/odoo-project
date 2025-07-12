import Order from "../model/orderModel.js";
import User from "../model/userModel.js";

// Place Order
export const placeOrder = async (req, res) => {
    try {
        const { items, amount, address } = req.body;
        const userId = req.userId;

        // Basic validation
        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ message: "Items are required and should be an array" });
        }
        if (!amount || typeof amount !== 'number') {
            return res.status(400).json({ message: "Valid amount is required" });
        }
        if (!address || typeof address !== 'object') {
            return res.status(400).json({ message: "Valid address object is required" });
        }

        const orderData = {
            items,
            amount,
            userId,
            address,
            paymentMethod: 'COD',
            payment: false,
            status: 'Processing', 
            date: new Date()
        };

        const newOrder = new Order(orderData);
        await newOrder.save();

        // Clear user's cart
        await User.findByIdAndUpdate(userId, { cartData: [] });

        return res.status(201).json({ message: 'Event Booked', order: newOrder });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Event Booking Error' });
    }
};

// Get Orders for Logged-In User
export const userOrders = async (req, res) => {
    try {
        const userId = req.userId;
        const orders = await Order.find({ userId }).sort({ date: -1 }); 
        return res.status(200).json(orders);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "User order fetch error" });
    }
};

// Get All Orders (Admin)
export const allOrders = async (req, res) => {
    try {
        const orders = await Order.find({}).sort({ date: -1 });
        return res.status(200).json(orders); 
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "adminAllOrder error" });
    }
};

// Update Order Status (Admin)
export const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;

        if (!orderId || !status) {
            return res.status(400).json({ message: "Order ID and status are required" });
        }

        const updatedOrder = await Order.findByIdAndUpdate(orderId, { status }, { new: true });

        if (!updatedOrder) {
            return res.status(404).json({ message: "Order not found" });
        }

        return res.status(200).json({ message: "Status updated", order: updatedOrder });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message || "Status update error" });
    }
};
