require('dotenv').config();
const jwt = require('jsonwebtoken');


const fetchuser = (req,res,next)=>{
    const JWT_SECRET=process.env.JWT_SEC;
    //get the user from jwt token and add id to request object
    const token = req.header('auth-token');
    if(!token){
      return  res.status(401).json({error:"Access Denied - Invalid token"});
    }
    try {
    const data = jwt.verify(token,JWT_SECRET)
   
    req.user = data.user;
    
    next();
    } catch (error) {
        return  res.status(401).json({error:"Access Denied - Invalid token"});
        
}

}
module.exports = fetchuser;