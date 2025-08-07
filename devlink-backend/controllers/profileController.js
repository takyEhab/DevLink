import Profile from "../models/Profile.js";

// @desc    Get current user's profile
// @route   GET /api/profile/me
// @access  Private
export const getMyProfile = async (req, res, next) => {
  try {
    const profile = await Profile.findOne({ user: req.user.userId }).populate(
      "user",
      "-password"
    );

    if (!profile) {
      res.status(404);
      throw new Error("Profile not found");
    }
    res.status(200).json({
      success: true,
      message: "Profile retrieved successfully",
      data: { profile },
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Create or update profile
// @route   POST /api/profile
// @access  Private
export const createOrUpdateProfile = async (req, res, next) => {
  try {
    const { title, location, bio, skills } = req.body;

    const profileData = {
      user: req.user.userId,
      title,
      location,
      bio,
      skills,
    };

    let profile = await Profile.findOne({ user: req.user.userId });

    if (profile) {
      // Update existing profile
      profile = await Profile.findOneAndUpdate(
        { user: req.user.userId },
        { $set: profileData },
        { new: true }
      ).populate("user", "name");

      return res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        data: { profile },
      });
    }

    // Create new profile
    const newProfile = new Profile(profileData);
    await newProfile.save();

    const populatedProfile = await newProfile.populate("user", "name");

    res.status(201).json({
      success: true,
      message: "Profile created successfully",
      data: { profile: populatedProfile },
    });
  } catch (error) {
    next(error);
  }
};


// @desc    Get profile by user ID
// @route   GET /api/profile/user/:userId
// @access  Public
export const getProfileByUserId = async (req, res, next) => {
  try {
    const profile = await Profile.findOne({ user: req.params.userId }).populate(
      "user",
      "name"
    );

    if (!profile) {
      res.status(404);
      throw new Error("Profile not found");
    }

    res.status(200).json({
      success: true,
      message: "Profile fetched successfully",
      data: { profile },
    });
  } catch (err) {
    next(err);
  }
};
