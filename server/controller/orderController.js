import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    totalPrice,
  } = req.body;


  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No ordered items");
    return;
  } else {
    const order = new Order({
      orderedItems:orderItems,
      user: req.userId,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      totalPrice,
    });

    console.log(order.orderItems);

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
});

// @desc    get all orders
// @route   POST /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user', '_id name')
  res.json(orders)
})

export { addOrderItems, getOrders };

