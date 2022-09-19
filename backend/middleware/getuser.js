const jwt = require("jsonwebtoken");

const fetchuser=async(req,res,next)=>{
    let auth_token=req.header("auth-token")
    if(!auth_token){
        res.status(401).json({error:"Access Denied"})
    }
    let data = jwt.verify(auth_token,"shhhh")
    req.user = data.user
    next();

}
module.exports=fetchuser;