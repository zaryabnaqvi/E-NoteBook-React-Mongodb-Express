const express=require("express")
const User = require("../models/User")
const router=express.Router();
const { body, validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs')
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/getuser");

router.post('/', [
    // define validations
    body('name').isLength({ min: 3 }),
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
], async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    let user = await User.findOne({email:req.body.email});
    if (user){
        return res.status(400).json({errors:"account on this email already exist"});
    }
    let salt = await bcryptjs.genSalt();
    let secPass=await bcryptjs.hash(req.body.password,salt);
    
    user= await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
    })
    let data ={
        user:{
            id:user.id
        }
}
    let token=jwt.sign(data,"shhhh")
    res.send({token})
    console.log(token)
})

router.post('/login', [
    // define authenication validations
    body('email').isEmail(),
], async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    let {email,password}=req.body
    let user=await User.findOne({email})
    if(!user){
        return res.status(400).json({errors:"login with correct email"})
    }
    let auth =await bcryptjs.compare(password,user.password)
    if(!auth){
         return res.status(400).json({errors:"login with correct email"});
    }
    let data ={
        user:{
            id:user.id
        }
    }
    let token=jwt.sign(data,"shhhh")
    res.send({token})
    console.log(token)

})

router.post('/getuser', fetchuser, async(req, res) => {
    let UserId=req.user.id;
    let user= await User.findById(UserId).select("-password")
    res.send(user)
})

module.exports = router