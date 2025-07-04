const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  cart: Array,
  address: String,
  paymentMethod: String,
  status: {
    type: String,
    default: 'Order Placed',
  },
}, { timestamps: true }); // ⬅️ REQUIRED

module.exports = mongoose.model('Order', orderSchema);
