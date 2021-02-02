const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const tokenSecret = process.env.TOKEN_SECRET


const {userModel}  = require("./createDatabase.js");

router.post("/signup" , async (req,res)=>{
    const { name , password } = req.body ;
    //user exists
    const existingUser = await userModel.findOne({name})
    if(existingUser) return res.status(400).send({message:"user already exist"})
    //hash password
    const SALT = await bcrypt.genSalt(10);
    const hashedPwd = bcrypt.hashSync(password , SALT);
    //create and save user
    let newUser  = new userModel({name , password: hashedPwd });
    await newUser.save()

    const token = jwt.sign({_id:newUser._id}, tokenSecret);
    res.status(200).json({token , messsage:'signup is successful' });
    
})

router.post("/login" , async (req,res)=>{
    const {name , password} = req.body;
    //user exists
    const existingUser = await userModel.findOne({name});
    if(!existingUser) return res.status(400).send({message:"user does not exist !"})

    if(!bcrypt.compareSync(password , existingUser.password))
      return   res.status(400).json({message:"password incorrect"});
    
    const token = jwt.sign({_id:existingUser._id}, tokenSecret);
    res.status(200).json({token , messsage:'login is successful' });

})


module.exports = router