const mongoose = require('mongoose');
const { Pschema } = require('./product');


const schema=mongoose.Schema({
name:{
    type:String,
    trim:true,
    required:true,
},
email:{
    type:String,
    trim:true,
    validate:{
        validator:(value)=>{
            const re =
                /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
          return value.match(re);
        },
      message:"Enter Valid email address",
    }
},
password:{
    type: String,
    required:true,
},
address:{
    type:String,
    default:"",
},
type:{
    type:String,
    default:"user",
},
cart:[
    {
        product:Pschema,
        quantity:{
            type:Number,
            required:true,
        },
    }
],

});

const User = mongoose.model('User',schema);
module.exports = User;