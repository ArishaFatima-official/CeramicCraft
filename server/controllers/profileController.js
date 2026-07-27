const pool = require("../config/db");
const bcrypt = require("bcrypt");

const getprofile = async (req, res, next) => { //getprofile
  const user_id = req.user.id;
  try {
    const result = await pool.query(
      "SELECT id, name, email, phone, address, role FROM users WHERE id = $1",
      [user_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      data: result.rows[0],
    });

  } catch (err) {
    next(err);
  }
};

const updateprofile = async (req, res, next) => {  //updateprofile
  const user_id = req.user.id;

  const {
    name,
    email,
    phone,
    address,
  } = req.body;

  try {

    const existinguser = await pool.query(
      "SELECT * FROM users WHERE id = $1",
      [user_id]
    );

    if (existinguser.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const existingemail = await pool.query(
      "SELECT * FROM users WHERE email = $1 AND id != $2",
      [email, user_id]
    );

    if (existingemail.rows.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    const result = await pool.query(
      `UPDATE users SET name = $1, email = $2, phone = $3, address = $4 WHERE id = $5  RETURNING id, name, email, phone, address, role`,
      [name,email,phone,address,user_id,  ]
    );

    res.status(200).json({
      success: true,
      data: result.rows[0],
    });

  } catch (err) {
    next(err);
  }
};

const changepassword = async (req, res, next) => {  //changepassword

  const user_id = req.user.id;

  const {
    currentPassword,
    newPassword,
  } = req.body;

  try {

    const user = await pool.query(
      "SELECT * FROM users WHERE id = $1",
      [user_id]
    );

    if (user.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(
      currentPassword,
      user.rows[0].password
    );

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10 );

    await pool.query(
      "UPDATE users SET password = $1 WHERE id = $2",
      [hashedPassword, user_id, ]
    );

    res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });

  } catch (err) {
    next(err);
  }
};

module.exports = {
  getprofile,
  updateprofile,
  changepassword,
};