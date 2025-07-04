const express = require('express');
const router = express.Router();
const {
  placeOrder,
  getOrderStatus,
  updateOrderStatus
} = require('../controllers/orderController');

const adminAuth = require('../middlewares/auth'); // ✅ Import admin auth middleware

// Public routes
router.post('/place-order', placeOrder);
router.get('/order-status/:id', getOrderStatus);
router.put('/update-status/:id', updateOrderStatus); // optional for frontend dev use

// ✅ Admin-only routes
router.get('/admin/orders', adminAuth, async (req, res) => {
  try {
    const Order = require('../models/Order');
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

router.put('/admin/order/:id', adminAuth, async (req, res) => {
  try {
    const Order = require('../models/Order');
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: 'Error updating order status' });
  }
});

module.exports = router;
