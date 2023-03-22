const express = require('express');
const admin = require('../middlewares/admin');
const {Product} = require('../models/product');
const Order=require('../models/order');
const adminRouter = express.Router();


adminRouter.post('/admin/add-product',admin, async (req, res)=>{
   try {
    const {name,description,images,quantity,price,category} = req.body;
    let product = new Product({name, description, images, quantity, price, category});
    product = await product.save();
    res.json(product);



   } catch (e) {
     res.status(500).json({error: e.message});
   }
    
});
//delete product
adminRouter.post('/admin/delete-product',admin, async (req, res)=>{
  try {
 const {id}= req.body; 
 let product = await Product.findByIdAndDelete(id);  
 res.json(product);


  } catch (e) {
    res.status(500).json({error: e.message});
  }
});


//get all products to post page


adminRouter.get('/admin/get-products',admin, async (req, res)=>{
try {
  const products = await Product.find({});//find all products by any: name=aa or desc..
  res.json(products); 
} catch (e) {
    res.status(500).json({error: e.message});
}

});
//fetch orders to admin page
adminRouter.get('/admin/get-orders',admin, async (req, res)=>{
  try {
    const orders = await Order.find({});//find all orders by any: name=aa or desc.. desc....
    res.json(orders);
    
  } catch (e) {
    res.status(500).json({error: e.message});
  }
});

//change order status by tracking
adminRouter.post('/admin/change-order-status',admin, async (req, res)=>{
  try {
    const { id, status } = req.body;
    let order = await Order.findById(id);
    order.status = status;
    order = await order.save();
    res.json(order); 
  } catch (e) {
    res.status(500).json({error: e.message});
  }
});

adminRouter.get("/admin/analytics", admin, async (req, res) => {
  try {
    const orders = await Order.find({});
    let totalEarnings = 0;

    for (let i = 0; i < orders.length; i++) {
      for (let j = 0; j < orders[i].products.length; j++) {
        totalEarnings +=
          orders[i].products[j].quantity * orders[i].products[j].product.price;
      }
    }
    // CATEGORY WISE ORDER FETCHING
    let arduinoEarnings = await fetchCategoryWiseProduct("Arduino");
    let raspiEarnings = await fetchCategoryWiseProduct("Raspberry Pi");
    let motorEarnings = await fetchCategoryWiseProduct("Motors");
    let relayEarnings = await fetchCategoryWiseProduct("Relays");
    let sensorEarnings = await fetchCategoryWiseProduct("Sensors");
    let lcdEarnings = await fetchCategoryWiseProduct("LCD");

    let earnings = {
      totalEarnings,
      arduinoEarnings,
      raspiEarnings,
      motorEarnings,
      relayEarnings,
      lcdEarnings,
      sensorEarnings,
    };

    res.json(earnings);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});


async function fetchCategoryWiseProduct(category) {
  let earnings = 0;
  let categoryOrders = await Order.find({
    "products.product.category": category,
  });

  for (let i = 0; i < categoryOrders.length; i++) {
    for (let j = 0; j < categoryOrders[i].products.length; j++) {
      earnings +=
        categoryOrders[i].products[j].quantity *
        categoryOrders[i].products[j].product.price;
    }
  }
  return earnings;
}


module.exports = adminRouter;




