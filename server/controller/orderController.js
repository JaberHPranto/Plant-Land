import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
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

    // console.log(order.orderItems);

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
    const numOfDays = 120
    const dd = new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * numOfDays).toISOString()
    
    console.log(dd.substring(0,10))
    const test = [
   // Get only records created in the last 30 days
   {
      $match: {
         "createdAt": {
            $gte: new Date(`${dd.substring(0,10)}`)
          //  $gte: new Date(`${year}-07-01`), $lt: new Date(`${year}-07-31`)
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
      }
    ]


    // const dayCount = await Order.aggregate(test)
    // console.log(dayCount)
    // console.log(dayCount.length)

    // const dayWiseSale = new Array(30).fill(0)
    // for (let i of dayCount) {
    //   dayWiseSale[i.day]=dayWiseSale[i.day]+1
    // }
  

    return res.status(200).json(saleDataByMonths)
    
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Server Error"})
  }
}


const getSaleDataByMonth = async (req, res) => {
  try {
    
    const { selectedMonth } = req.body
    let month_no=1;
    let numOfDays=30;
    const year = 2021;
  
    if (selectedMonth === 'jan') { month_no = 1, numOfDays = 31 }
    else if (selectedMonth === 'feb') { month_no = 2, numOfDays = 28 }
    else if (selectedMonth === 'mar') { month_no = 3, numOfDays = 31 }
    else if (selectedMonth === 'apr') { month_no = 4, numOfDays = 30 }
    else if (selectedMonth === 'may') { month_no = 5, numOfDays = 31 }
    else if (selectedMonth === 'jun') { month_no = 6, numOfDays = 30 }
    else if (selectedMonth === 'jul') { month_no = 7, numOfDays = 31 }
    else if (selectedMonth === 'aug') { month_no = 8, numOfDays = 31 }
    else if (selectedMonth === 'sep') { month_no = 9, numOfDays = 30 }
    else if (selectedMonth === 'oct') { month_no = 10, numOfDays = 31 }
    else if (selectedMonth === 'nov') { month_no = 11, numOfDays = 30 }
    else if (selectedMonth === 'dec') { month_no = 12, numOfDays = 31 }


    const saleByMonth = [
   {
      $match: {
         "createdAt": {
           $gte: new Date(`${year}-0${month_no}-01`), $lt: new Date(`${year}-0${month_no}-${numOfDays}`)
         }
      }
   },
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
      }
    ]

    const dayCount = await Order.aggregate(saleByMonth)
    const dayWiseSale = new Array(numOfDays).fill(0)
    
    for (let i of dayCount) {
      dayWiseSale[i.day]=dayWiseSale[i.day]+1
    }

    // console.log(dayWiseSale);

    res.status(200).json(dayWiseSale)

  }catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Server Error"})
  }
}

const saleByAProduct = asyncHandler(async (req, res) => {
  const { product_id } = req.body
  const productQtyData = []
  let productName="";
  let productPrice="";

  try {
    const productData = await Order.find({ "orderedItems.productId": product_id })
    if (productData.length) {
      const selectedProduct = await Product.findById(product_id)
      productName = selectedProduct.name
      productPrice = selectedProduct.price
      for (let pd of productData) {
        const p_qty = pd.orderedItems[0].qty
        const month_no = pd.createdAt.getMonth()
        productQtyData.push({p_qty,month_no})
      }
    }

    
    const monthWiseQty = new Array(12).fill(0)
    for (let i of productQtyData){
      monthWiseQty[i.month_no] += i.p_qty
    }
    // console.log(monthWiseQty);
    // console.log(productName);
    // console.log(productPrice);

    return res.status(200).json({productName,productPrice,monthWiseQty})
    
  } catch (err) {
    console.log(err);
    // return res.status(500).json({ error: "Server Error"})
    throw new Error("Provide valid id")
  }

})

export { addOrderItems, getOrders, getOrderData, getSaleDataByYear, getSaleDataByMonth, saleByAProduct };

