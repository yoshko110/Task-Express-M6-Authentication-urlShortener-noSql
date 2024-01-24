const User = require("../../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const hashPassword = async (password) => {
  const hashPassword = await bcrypt.hash(password);
  return hashPassword;
};

const generateToken = (user) => {
  const payLoad = {
    _id: user._id,
    username: user.username,
  };
  const token = jwt.sign(payLoad, process.env.PASS_KEY, { expiresIn: "5h" });
  return token;
};
exports.signup = async (req, res, next) => {
  try {
    const password = req.body.password;
    const hashedPassword = await hashPassword(password);
    req.body.password = hashedPassword;

    const newUser = await User.create(req.body);
    const token = generateToken(newUser);

    res.status(201).json({ toke: token });
  } catch (err) {
    next(err);
  }
};

exports.signin = async (req, res) => {
  try {
    const token = generateToken(req.user);
    res.status(201).json(token);
  } catch (err) {
    res.status(500).json("Server Error");
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().populate("urls");
    res.status(201).json(users);
  } catch (err) {
    next(err);
  }
};
