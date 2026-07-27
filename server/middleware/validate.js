
const validate = (requiredFields) => {
  return (req, res, next) => {

    const missingFields = [];

    requiredFields.forEach((field) => {
      if (
        req.body[field] === undefined ||
        req.body[field] === null ||
        req.body[field] === ""
      ) {
        missingFields.push(field);
      }
    });

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missingFields.join(", ")}`
      });
    }

    next();
  };
};

const validateRegister = (req, res, next) => {
  const { name, email, password, phone, address, role } = req.body;

  if (!name || !email || !password || !phone || !address || !role) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  next();
};

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and Password are required",
    });
  }

  next();
};

module.exports = {
    validate,
  validateRegister,
  validateLogin,
};

