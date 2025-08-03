import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    minlength: 3,
  },
  email: {
    type: String,
    unique: true,
    minlength: 6,
    required: [true, "Email is required"],
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email address"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: 6,
  },
  github: {
    type: String,
    // validation for URL format
    match: /^(https?:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9_-]+\/?$/,
  },
  linkedIn: {
    type: String,
    // validation for URL format
    match: /^(https?:\/\/)?(www\.)?linkedin\.com\/[a-zA-Z0-9_-]+\/?$/,
  },
  about: String,
  bio: String,
  skills: String,

  role: {
    type: String,
    enum: ["user", "admin"], // Define allowed roles
    default: "user", // Set a default role
  },
  //   comments: [{ body: String, date: Date }],
  //   date: { type: Date, default: Date.now },
  //   hidden: Boolean,
  //   meta: {
  //     votes: Number,
  //     favs: Number,
  //   },
});
const User = mongoose.model("User", userSchema);
export default User;
