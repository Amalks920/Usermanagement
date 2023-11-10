const validator = require("validator");
const {check,oneOf,validationResult}=require('express-validator')
const usernameRegex = /^[a-zA-Z]{3,}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;


 const signUpValidation=[
  
        check('username')
          .exists()
          .withMessage('Username is required')
          .isLength({ min: 3 })
          .withMessage('Username must be at least 3 characters long')
          .matches(/*/^[a-zA-Z0-9_.-]+$/*/ usernameRegex)
          .withMessage('Username must only contain alphanumeric characters, underscores, periods, and hyphens'),
        check('email')
          .exists()
          .withMessage('Email is required')
          .isEmail()
          .withMessage('Email must be a valid email address'),

      check('password')
        .exists()
        .withMessage('Password is required')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long')
        .matches(/* /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$/ */ passwordRegex)
        .withMessage('Password must contain at least one upper and lowercase letter and one number'),
  ]

  const loginValidation=[
    check('emailInput')
    .exists()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Email must be a valid email address'),

check('password')
  .exists()
  .withMessage('Password is required')
  .isLength({ min: 8 })
  .withMessage('Password must be at least 8 characters long')
  .matches(/* /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$/ */ passwordRegex)
  .withMessage('Password must contain at least one upper and lowercase letter and one number'),
  ]



module.exports = {
  signUpValidation,loginValidation
};
