import { UserModel } from '../models/Users.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// @desc    Logs a user in.
// @route   POST /users/login
// @access  Public
const loginUser = async (req, res) => {
  const { username, password } = req.body;
  const user = await UserModel.findOne({ username });

  if (!user) {
    return res.json({ message: 'User does not exist!' });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.json({ message: 'Username or password is incorrect!' });
  }

  const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET);
  res.json({ token, userID: user._id });
};

// @desc    Registers a user in.
// @route   POST /users/register
// @access  Public
const registerUser = async (req, res) => {
  const { username, password } = req.body;
  const user = await UserModel.findOne({ username });

  if (user) {
    return res.json({ message: 'User already exists!' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new UserModel({
    username: username,
    password: hashedPassword,
    boards: '{}',
  });

  await newUser.save();

  res.json({ message: 'User registered successfully!' });
};

export { loginUser, registerUser };
