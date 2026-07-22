const pool = require("../config/db");
const bcrypt	=require("bcrypt");
const generateToken = require("../utils/generateToken");

const register = async (req,res,next)=>{
const { name, email, password, phone, address } = req.body;
try{
     const existingUser = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

const saltRounds = 10; 
const hashedPassword = await bcrypt.hash(password,saltRounds);

 const result =await pool.query(
         "INSERT INTO USERS (name,email,password,phone,address,role) VALUES ($1, $2, $3, $4, $5,$6) RETURNING *",
         [name,email,hashedPassword,phone,address,"customer",]
    )
     const user = result.rows[0];

const token = generateToken(user.id, user.role);

res.status(201).json({
    success: true,
    message: "User registered successfully",
    token,
    user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
    },
});;
}

catch(err){
      next(err);
}
}


module.exports = {
  register,
};