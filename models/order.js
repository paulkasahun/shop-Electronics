const mongoose = require ('mongoose');
const { Pschema } = require('./product');

const oSchema = mongoose.Schema({

    products:[
        {
            product:Pschema,
            quantity:{
                type: Number,
                required: true,
            },
        },

    ],
    totalPrice: {
        type: Number,
        required:true,
    },
   
    address:{
        type: String,
        required:true,
    },
    userId:{
        required:true,
        type: String,
    },
    userName:{
        type: String,
        required:true,
    },
    orderedAt:{
        type:Number,
        required:true,
    },
    status:{
        type: Number,
        default:0,
    }

});

const Order = mongoose.model("Order",oSchema);
module.exports = Order;