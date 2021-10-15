import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";
import User from "../models/userModel.js";

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

const getOrderData = async (req, res) => {
  try {

    const eachProductTotalSale = [
      { $match: {} },
      { $unwind: "$orderedItems" },     
      { $group: { "_id": "$orderedItems.name", "total": { "$sum": "$orderedItems.qty" } } },
      {$sort:{"total":-1}}
    ]
    
    const eachCustomerTotalBuy = [
      { $match: {} },
      { $group: { "_id": "$user", "total": { "$sum": "$totalPrice" } } },
      { $sort: { "total": -1 } }
    ]
    

    const productSaleData = await Order.aggregate(eachProductTotalSale)
    const customerBuy = await Order.aggregate(eachCustomerTotalBuy).limit(5)

    const customerBuyData = []
    for (let cb of customerBuy) {
      const { name,email } = await User.findById(cb._id)
      customerBuyData.push({ customer_email: email, customer_name: name, total: cb.total })
    }

    const totalOrder = await Order.countDocuments()
    const totalPaidOrder = await Order.find({ isPaid: true }).countDocuments()
    const totalDelivered = await Order.find({ isDelivered: true }).countDocuments()
  

    // console.log(productSaleData);
    // console.log("--------");
    // console.log(customerBuyData);

    res.status(200).json({ productSaleData, customerBuyData, totalOrder, totalPaidOrder, totalDelivered })

  }catch(err){
    console.log(err)
    res.status(401).json({error:"Something went wrong"})
  }
}


const getSaleDataByYear = async (req, res) => {
  try {
    const year = 2021
    
    const months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"]
    
    const saleDataByMonths=[]
    for (let i = 1; i <= 12; i++){
      const monthQuery = { createdAt: { $gte: new Date(`${year}-0${i}-01`), $lt: new Date(`${year}-0${i}-31`) } }
      const saleByMonth = await Order.find(monthQuery)
      const month = months[i-1]
      saleDataByMonths.push({ month, totalOrder: saleByMonth, numOfOrder: saleByMonth.length })
    }

    // New 
    const dd = new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 120).toISOString()
    
    console.log(dd.substring(0,10))
    const test = [
   // Get only records created in the last 30 days
   {
      $match: {
         "createdAt": {
            $gte: new Date(`${dd}`)
         }
      }
   },
   // Get the year, month and day from the createdTimeStamp
   {
      $project: {
         "year": {
            $year: "$createdAt"
         },
         "month": {
            $month: "$createdAt"
         },
         "day": {
            $dayOfMonth: "$createdAt"
         }
      }
   },
    ]


    const dayCount = await Order.aggregate(test)
    // for (let i of dayCount) {
    //   if()
    // }

    // console.log(dayCount);
  

    return res.status(200).json(saleDataByMonths)
    
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Server Error"})
  }
}

export { addOrderItems, getOrders, getOrderData, getSaleDataByYear };

