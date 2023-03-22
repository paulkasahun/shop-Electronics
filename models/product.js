const mongoose = require('mongoose');
const rSchema = require('./ratings');


const Pschema = mongoose.Schema({
name:{
    type : String,
    required: true,
    trim: true,
},
description:{
 type: String,
 required: true,
 trim: true,
},
images: [{type: String, required: true}],
quantity:{
    type:Number,
    required: true,
},
price:{
    type: Number,
    required: true,
},
category:{
    type : String,
    required: true
},
ratings:[rSchema]


});
Product = mongoose.model("Product", Pschema);
module.exports = {Product,Pschema};