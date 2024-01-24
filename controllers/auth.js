const { generate, verify } = require("../utils/generateToken");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const ErrorrResponse = require("../utils/ErrorResponse");

exports.login = async (req, res) => {
  const { username, password } = req.body;

  if (!(username && password))
    throw new ErrorrResponse(401, "Please Enter username and Password");

  const user = await User.findOne({ username });

  if (!user) throw new ErrorrResponse(401, "Wrong username or password");

  const isMatch = await user.matchPassword(password);
  if (!isMatch) throw new ErrorrResponse(401, "Wrong username or password");

  if (!user.isActive)
    throw new ErrorrResponse(401, "This account is not active");

  res.status(200).json({
    success: true,
    token: generate(user),
  });
};

exports.refresh = async (req, res) => {
  const refreshToken = req.body?.token?.refresh;

  console.log(refreshToken);
  if (!refreshToken)
    throw new ErrorrResponse(401, "Please Enter token.refresh");

  const tokenData = await verify(refreshToken, true);

  if (tokenData.stack) throw new ErrorrResponse(401, "Invalid Token");

  const { _id, password } = tokenData;

  if (!(_id && password)) throw new ErrorrResponse(401, "wrong id or password");

  const user = await User.findOne({ _id });
  if (!user) throw new ErrorrResponse(401, "Wrong username or password");
  if (user.password !== password)
    throw new ErrorrResponse(401, "Wrong username or password");
  if (!user.isActive)
    throw new ErrorrResponse(401, "This account is not active");

  res.status(200).json({
    success: true,
    token: generate(user, true),
  });
};


exports.logout = async(req, res)=>{
    res.status(200).json({
        success: false, 
        message: 'No action needed to logout. Delete the token from your browser data'
    })
}