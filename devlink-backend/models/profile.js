import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  title: {
    type: String,
    trim: true,
    maxlength: 100,
  },
  location: {
    type: String,
    trim: true,
    maxlength: 100,
  },
  skills: {
    type: [String],
    validate: [arrayLimit, "{PATH} exceeds the limit of 10"],
  },
  bio: {
    type: String,
    trim: true,
    maxlength: 500,
  },
  portfolio: {
    type: String,
    trim: true,
    // validation for URL format
    match: /^https?:\/\/.+/,
  },
  github: {
    type: String,
    trim: true,
    match: /^(https?:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9_-]+\/?$/,
  },
  linkedIn: {
    type: String,
    trim: true,
    match: /^(https?:\/\/)?(www\.)?linkedin\.com\/[a-zA-Z0-9_-]+\/?$/,
  },
});

// Limit skills array to 10 items max
function arrayLimit(val) {
  return val.length <= 10;
}
const Profile = mongoose.model("Profile", ProfileSchema);
export default Profile;
