import createHttpError, { isHttpError } from "http-errors";
import User from "../model/user.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { generateAccessToken } from "../config/generateAccessToken.js";
import Url from "../model/url.js";
export const registerUser = async (req, res, next) => {
  const { username, password, email } = req.body;
   console.log("Received on backend:", { username, password, email });
  try {
    if (!username || !password ) {
      return next(createHttpError(400, "All fields are required"));
    }

    const exisitingUsername = await User.findOne({ username: username });
    if (exisitingUsername) {
      return next(createHttpError(409, "Username exits"));
    }
    const exisitingEmail = await User.findOne({ email: email });
    if (exisitingEmail) {
      return next(createHttpError(409, "Email exits"));
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
      username,
      password: hashedPassword,
      email,
    });
    const accessToken = generateAccessToken(user._id);
    res.status(201).json({
      success: true,
      message: "Account Created Successfully",
      accessToken,
    });
  } catch (error) {
    next(error);
  }
};
export const loginUser = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    if (!username || !password) {
      return next(createHttpError(400, "Enter all fields"));
    }
    const user = await User.findOne({ username: username }).select("+password");
    if (!user) {
      return next(createHttpError(404, "Account not found"));
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return next(createHttpError(401, "Invalid credentials"));
    }

    const accessToken = generateAccessToken(user._id);
    res.status(200).json({
      success: true,
      accessToken,
      message: `Welcome ${user.username}`,
    });
  } catch (error) {
    next(error);
  }
};
export const getUser = async (req, res, next) => {
  const { id: userId } = req.user;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return next(createHttpError(404, "User not found"));
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    next(error);
  }
  console.log("req.user:", req.user);
};
export const logout = async (req, res, next) => {
  res.status(200).json({ message: "Logged out successfully" });
};


export const getUserStats = async (req, res) => {
  try {
    const userId = req.user.id;

    
    const totalLinks = await Url.countDocuments({ owner: userId });
    console.log(`User ${userId} owns ${totalLinks} links`);

    
    const totalAnonymous = await Url.countDocuments({
      owner: { $exists: false },
    });
    console.log(`There are ${totalAnonymous} anonymous links`);

    // Sum clicks for user's URLs
    const clicksAgg = await Url.aggregate([
      { $match: { owner: userId } },
      {
        $group: {
          _id: null,
          totalClicks: { $sum: "$clicks" },
        },
      },
    ]);
    const totalClicks = clicksAgg.length > 0 ? clicksAgg[0].totalClicks : 0;

    const activeLinks = await Url.countDocuments({
      owner: userId,
      active: true,
    });

    res.status(200).json({
      totalLinks,
      totalClicks,
      activeLinks,
    });
  } catch (error) {
    console.error("Error getting user stats:", error);
    res.status(500).json({ message: "Failed to get user stats." });
  }
};


//MVC
//MVVM
//MI
