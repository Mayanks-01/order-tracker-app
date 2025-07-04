const Order = require('../models/Order');

const statuses = [
  'Order Placed',
  'Preparing',
  'Picked by Delivery Partner',
  'On the Way',
  'Delivered',
];

// Place Order
exports.placeOrder = async (req, res) => {
  try {
    const { cart, address, paymentMethod } = req.body;
    const order = await Order.create({ cart, address, paymentMethod });
    res.status(201).json({ orderId: order._id });
  } catch (err) {
    res.status(500).json({ error: 'Error placing order' });
  }
};

// Get Status (auto-update every 10s)
exports.getOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });

    const statuses = [
      'Order Placed',
      'Preparing',
      'Picked by Delivery Partner',
      'On the Way',
      'Delivered',
    ];

    // ✅ Log createdAt to debug
    console.log('🕒 Order Created At:', order.createdAt);

    const timeSinceCreation = (Date.now() - new Date(order.createdAt).getTime()) / 1000;
    console.log('⏱️ Time since creation:', timeSinceCreation);

    const stage = Math.min(Math.floor(timeSinceCreation / 10), statuses.length - 1);
    const newStatus = statuses[stage];

    console.log('➡️ New calculated status:', newStatus);

    if (order.status !== newStatus) {
      order.status = newStatus;
      await order.save();
      console.log('✅ Status updated in DB');
    }

    res.json({ status: order.status });
  } catch (err) {
    console.error('❌ Error in getOrderStatus:', err);
    res.status(500).json({ error: 'Error retrieving status' });
  }
};


// Manual status update (optional)
exports.updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: 'Error updating status' });
  }
};
