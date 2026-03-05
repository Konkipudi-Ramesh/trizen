import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user._id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );
};

export const signup = async (req, res) => {
  try {

    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    if (!["brand", "customer"].includes(role)) {
      return res.status(400).json({
        message: "Invalid role"
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role
    });

    res.status(201).json({
      message: "User created successfully"
    });

  } catch (error) {

    console.log(error);
    res.status(500).json({
      message: "Signup failed"
    });

  }
};

export const login = async (req, res) => {
  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user)
      return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    user.refreshToken = refreshToken;
    await user.save();

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict"
    });

    res.json({ accessToken });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const refreshAccessToken = async (req, res) => {
  try {

    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ message: "No refresh token" });
    }

    const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decoded.id);

    if (!user || user.refreshToken !== refreshToken) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    const accessToken = generateAccessToken(user);

    res.json({ accessToken });

  } catch (error) {

    res.status(403).json({
      message: "Refresh token expired"
    });

  }
};
export const logout = async (req, res) => {
  try {

    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.sendStatus(204);
    }

    const user = await User.findOne({ refreshToken });

    if (user) {
      user.refreshToken = null;
      await user.save();
    }

    res.clearCookie("refreshToken");

    res.json({
      message: "Logged out successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: "Logout failed"
    });

  }
};