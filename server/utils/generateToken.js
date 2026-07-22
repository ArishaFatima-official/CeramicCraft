require("dotenv").config();
console.log("JWT_SECRET:", process.env.JWT_SECRET);

const jwt = require("jsonwebtoken");

const generateToken = ( userId,role,)=>{
    return jwt.sign(
    {userId,
      role,},
     process.env.JWT_SECRET,			
    {	expiresIn:	"1h"	}
);
}
module.exports = generateToken;
