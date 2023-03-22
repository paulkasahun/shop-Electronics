const express = require('express');
const productRouter = express.Router();
const auth = require('../middlewares/auth');
const {Product} = require('../models/product');



//create rating request for product


productRouter.post('/api/rate-product',auth, async(req,res)=>{
  try {
    
    const {id, rating} = req.body;
    let prd = await Product.findById(id);

    for (let i=0; i<prd.ratings.length; i++){
     if(prd.ratings[i].userId==req.user){ 
      prd.ratings.splice(i, 1);
      break;
    };
    }

    const rSchema = {
      userId: req.user,
      rating,
    };
    prd.ratings.push(rSchema);
    prd = await prd.save();
    res.json(prd);
    /*{
    {
      userId: 'aswe',
      rating: 2.3
    },
    {
      userId: 'erwr',
      rating: 5
    }
      

    }*/

  } catch (e) {
    res.status(500).json({error: e.message});
  }
});

// create a get request to search products and get them
// /api/products/search/i
productRouter.get("/api/products/search/:name", auth, async (req, res) => {
  try {
    const products = await Product.find({
      //fetch based on the following format of name
      name: { $regex: req.params.name, $options: "i" },
      //name: req.params.name this name needs full name to be written
    });

    res.json(products);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

//fetch category prducts
productRouter.get("/api/products", auth ,async (req, res) => {
  try {
    console.log(req.query.category);
    const products = await Product.find({ category: req.query.category });
    res.json(products);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
/**productRouter.get("/api/products/", auth, async (req, res) => {
  try {
    const products = await Product.find({ category: req.query.category });
    res.json(products);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
 * 
 * 
 * 
 */

/*

productRouter.get('/api/products/',async (req,res)=>{
try {
  const products = await Product.find({images: req.query.images});  
  res.json(products);


} catch (e) {
    res.status(500).json({message: e.message});
}
});*/

productRouter.get('/api/deal-of-day',auth, async (req, res)=>{
  try {
    
    let dprods = await Product.find({});
    //sort all the products based on the ratings
    //A->10
    //B->30 C->50   sort each of them based on rates
    dprods.sort((a,b)=>{
      let aSum =0;
      let bSum =0;
      for (let i = 0; i < a.ratings.length; i++) {
        aSum+=a.ratings[i].rating;  
      }
      for (let i = 0; i < b.ratings.length; i++) {
          bSum+=b.ratings[i].rating;
        
      }

      return  aSum<bSum?1:-1;

    });
    res.json(dprods[0]);


  } catch (e) {
    res.status(500).json({error: e.message});
  }
});



module.exports = productRouter;