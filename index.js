import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { UserModel } from "./models/Users.js";

const app = express();

app.use(express.json());
app.use(cors());

dotenv.config();

mongoose.connect(
  `mongodb+srv://jovan8684:${process.env.DB_PASSWORD}@taskripple.pps7abn.mongodb.net/TaskRipple?retryWrites=true&w=majority`
);

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, (err) => {
      if (err) return res.sendStatus(403);
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

app.get("/", (req, res) => {
  res.send("Welcome!");
});

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const user = await UserModel.findOne({ username });

  if (user) {
    return res.json({ message: "User already exists!" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new UserModel({
    username: username,
    password: hashedPassword,
    boards: "{}",
  });

  await newUser.save();

  res.json({ message: "User registered successfully!" });
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await UserModel.findOne({ username });

  if (!user) {
    return res.json({ message: "User does not exist!" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.json({ message: "Username or password is incorrect!" });
  }

  const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET);
  res.json({ token, userID: user._id });
});

app.put("/home", async (req, res) => {
  try {
    const user = await UserModel.findOne({ _id: req.body.userID });

    if (!user) {
      return res.json({ message: "User does not exist!" });
    }

    if (user.boards === req.body.boards) {
      return res.json({ message: "Records up to date!" });
    }

    const result = await UserModel.findOneAndUpdate(
      { _id: req.body.userID },
      { boards: req.body.boards },
      {
        new: true,
      }
    );

    res.json(result.boards);
  } catch (err) {
    res.json(err);
  }
});

app.get("/home", verifyToken, async (req, res) => {
  try {
    const user = await UserModel.findOne({ _id: req.query.userID });
    if (!user) {
      return res.json({ message: "Could not find user by that id!" });
    }

    res.json(user.boards);
  } catch (err) {
    res.json(err);
  }
});

app.listen(process.env.PORT, () => console.log("Server started!"));

export default app;
