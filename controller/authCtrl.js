const { signUpHelper } = require("../helper/authHelper");
const { validationResult } = require("express-validator");
const userModel = require("../model/userModel");
const generateToken=require('../utils/generateJwt');

const signUp = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json(
      { data: {}, message: "Validation error.", errors: errors.array() },
      422
    );
  }

  try {
    const result = await signUpHelper(req.body);
    res.status(201).json({ result });
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
};

const loginSignUp = async (req, res, next) => {
  const { emailInput, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json(
      { data: {}, message: "Validation error.", errors: errors.array() },
      422
    );
  }

  try {
    const findUser = await userModel.findOne({ email: emailInput });
   

    if (findUser && (await findUser.isPasswordMatched(password))) {
        const { _id,email,isBlocked,role} = findUser;
        const accessToken = generateToken(
        findUser?._id,
        process.env.ACCESS_TOKEN_PRIVATE_KEY,
        "1d"
      );

      const refreshToken = generateToken(
        findUser?._id,
        process.env.REFRESH_TOKEN_PRIVATE_KEY,
        "1d"
      );
      
      const updateUser = await userModel.findByIdAndUpdate(
        findUser._id,
        { refreshToken: refreshToken },
        { new: true }
      );

      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });

      res.json({
        email: email,
        role: role,
        isBlocked: isBlocked,
        accessToken: accessToken,
        id: _id,
        refreshToken: refreshToken,
      });
    } else {
      res.json({ msg: "error" });
    }
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
};

module.exports = {
  signUp,
  loginSignUp,
};
