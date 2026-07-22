require("dotenv").config();
const jwt = require('jsonwebtoken');

function authmiddleware(req,res,next){
const authHeader = req.headers.authorization;
if (!authHeader?.startsWith("Bearer ")) {
  return res.status(401).json({
    message: "No token provided",
  });
}
const token = authHeader.split(" ")[1];
if (!token) {
    return res.status(401).json({ success: false, message: "No token provided" });
  }
try{
const decoded =	jwt.verify(token, process.env.JWT_SECRET);
	req.user = {
    id: decoded.userId,
    role: decoded.role
};		
    next();
}
catch(err){
 return res.status(401).json({
      success: false,
      message: "Unauthorized: Token is invalid or expired"
    });
}
}

module.exports =authmiddleware;