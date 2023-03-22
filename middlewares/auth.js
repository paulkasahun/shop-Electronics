
const jwt= require('jsonwebtoken');

const auth = async (req, res, next)=>{

    try {
   const token = req.header('x-auth-token');
   if (!token){return res.status(401).json({msg:"No auth token, acess denied"})}    
   const verdToken = jwt.verify(token, 'passwordKey');
   if (!verdToken){return res.status(401).json({msg:"Token verification failed, authorization denied"})}
   req.user = verdToken.id;
   req.token = token;
   next();
    } catch (e) {
        res.status(400).json({error: e.message});
    }

}

module.exports = auth;