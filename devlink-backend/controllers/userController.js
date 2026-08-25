import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const { JWT_SECRET, JWT_EXPIRES_IN } = process.env;
export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // check if the fields are empty
    if (!email || !name || !password) {
      const error = new Error("Please enter both name and email and password");
      error.statusCode = 400;
      throw error;
    }

    // check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log(existingUser);
      const error = new Error("Email already exists");
      error.statusCode = 409;
      throw error;
    }

    // password length check
    if (password.length < 6) {
      const error = new Error("Password must be at least 6 characters");
      error.statusCode = 400;
      throw error;
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create(
      { name, email, password: hashedPassword },
    );

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    // set token to the cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // true on HTTPS
      sameSite: "strict", // CSRF protection
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    });

    // Convert user to plain object and remove password
    const safeUser = user.toObject();
    delete safeUser.password;

    res.status(201).json({
      success: true,
      message: "Account created successfully",
      data: { user: safeUser },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    //
    if (!email || !password) {
      const error = new Error("Please enter both email and password");
      error.statusCode = 400;
      throw error;
    }
    const user = await User.findOne({ email });

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      const error = new Error("Invalid password");
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    //  Set token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // true on HTTPS
      sameSite: "strict", // CSRF protection
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    });

    // Convert user to plain object and remove password
    const safeUser = user.toObject();
    delete safeUser.password;

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      data: { user: safeUser },
    });
  } catch (error) {
    next(error);
  }
};


export const getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};
