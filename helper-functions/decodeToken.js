const jwt = require("jsonwebtoken");

var decodeToken = (req,res,next)=>{
    const token = req.get('authorization').split(' ')[1];
    if(!token) return res.status(401).json({error: "Unauthorized"});

    if(jwt.decode(token) == null) return res.status(401).json({error: "Token Expired"});

    const { _id } = jwt.decode(token);
    req['body']['user_id'] = _id;
    next();
}

module.exports = decodeToken;