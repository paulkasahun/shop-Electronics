const express = require('express');
const bcryptjs = require('bcryptjs');
const User =require('../models/user');
const jwt = require('jsonwebtoken');
const auth = require('../middlewares/auth');

const authRouter = express.Router();

authRouter.post('/api/signup', async(req,res)=>{
try {
    const {name,email,password} = req.body;
    const isExisted=await User.findOne({email});
    if (isExisted){return res.status(400).json({msg:"user with the same email already exists"});}
    const hashd = await bcryptjs.hash(password,8);
    let user = new User({
        name,
        email,
        password:hashd

    });
    user = await user.save();
    res.json(user);
    
} catch (e) {
    res.status(500).json({error: e.message});
}
});

//sign in user

authRouter.post('/api/signin', async (req,res)=>{

    try {
    //you need email and password to login
    const {email, password} = req.body;
    const regduser =  await User.findOne({email});
    if(!regduser){return res.status(400).json({msg: 'User with this email does not exist'});}
    const isMatch = await bcryptjs.compare(password, regduser.password);
    if(!isMatch){return res.status(400).json({msg: 'Incorrect Password'});}
    const token = jwt.sign({id:regduser._id},"passwordKey");
    res.json({token, ...regduser._doc});
    } catch (e) {
    res.status(500).json({error: e.message});
    }
});
//get user data

authRouter.post('/tokenIsValid', async(req, res) => {
    try {
        const token = req.header('x-auth-token');
        if(!token){return res.json(false)}
        const verdToken=jwt.verify(token, 'passwordKey');
        if (!verdToken){return res.json(false)}
        const verduser = await User.findById(verdToken.id);
        if (!verduser){res.json(false)}
        res.json(true);
    } catch (e) {
        res.status(500).json({error: e.message});
    }
});
//get
authRouter.get('/',auth, async(req, res)=>{
   const exdUser = await User.findById(req.user);
   res.json({...exdUser._doc, token: req.token}); 
   
});

module.exports = authRouter;