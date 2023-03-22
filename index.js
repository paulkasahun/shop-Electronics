const express = require('express');
const mongoose = require('mongoose');
const adminRouter = require('./router/admin');
const authRouter = require('./router/auth');
const productRouter = require('./router/product');
const userRouter = require('./router/user');

//initialize
const app = express();
const PORT = 5000
const DB= "mongodb+srv://paulos:kasaHun2003@cluster0.1abfvjz.mongodb.net/?retryWrites=true&w=majority";
//MIDDLEWARE
app.use(express.json());
app.use(authRouter);
app.use(adminRouter);
app.use(productRouter);
app.use(userRouter);
//connections
mongoose.connect(DB).then(()=>{console.log("ATLAS CONNECTED")}).catch((e)=>{console.log(e);});
app.listen(PORT,"0.0.0.0",()=>{
    console.log(`LISTENING: ${PORT}`);
});