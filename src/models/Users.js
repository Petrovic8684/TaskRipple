import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  boards: {
    type: String,
    required: true,
  },
});

export const UserModel = mongoose.model("users", UserSchema);
