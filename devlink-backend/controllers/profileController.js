import Profile from "../models/profile.js";

export const getMyProfile = async (req, res, next) => {
  try {
    const profile = await Profile.findOneByUserId(req.user.userId);

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

export const createOrUpdateProfile = async (req, res, next) => {
  try {
    const {
      title,
      location,
      bio,
      skills,
      education,
      github,
      portfolio,
      linkedIn,
    } = req.body;

    const missingFields = [];
    if (!title?.trim()) missingFields.push("title");
    if (!location?.trim()) missingFields.push("location");
    if (!bio?.trim()) missingFields.push("bio");
    if (
      !Array.isArray(skills) ||
      skills.filter((skill) => skill?.trim()).length === 0
    ) {
      missingFields.push("skills");
    }

    if (missingFields.length > 0) {
      return res.status(400).json({
        error: `Required profile fields missing: ${missingFields.join(", ")}`,
      });
    }

    const existingProfile = await Profile.findOneByUserId(req.user.userId);

    const profileData = {
      userId: req.user.userId,
      title,
      location,
      bio,
      skills,
      education,
      github,
      portfolio,
      linkedIn,
    };

    if (existingProfile) {
      const profile = await Profile.updateByUserId(
        req.user.userId,
        profileData,
      );
      return res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        data: { profile },
      });
    }

    const profile = await Profile.create(profileData);

    res.status(201).json({
      success: true,
      message: "Profile created successfully",
      data: { profile },
    });
  } catch (error) {
    next(error);
  }
};

export const getProfileByUserId = async (req, res, next) => {
  try {
    const profile = await Profile.findOneByUserId(req.params.userId);

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
