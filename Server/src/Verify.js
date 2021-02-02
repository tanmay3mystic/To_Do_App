const jwt = require('jsonwebtoken');

module.exports = function (req,res,next){
    const token =   req.headers.authorization.split(" ")[1];
    if(!token) return res.status(401).send({messaage : "Access denied"});
    try{
        const verified = jwt.verify(token , process.env.TOKEN_SECRET);
        console.log(verified);
        req.userID = verified._id;
        next();

    }catch(err){
        res.status(400).send("invalid token");
    }
}
