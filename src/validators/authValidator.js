const { body } = require("express-validator");

exports.registerValidator = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];


exports.loginValidator = [
    body('email')
      .notEmpty()
      .withMessage('EMAIL_REQUIRED')
      .isEmail()
      .withMessage('INVALID_EMAIL'),
  
    body('password')
      .notEmpty()
      .withMessage('PASSWORD_REQUIRED'),
  ];