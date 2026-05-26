import asycHandler from "../utils/AsyncHandler.js";
import { User } from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

const registerUser = asycHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if ([username, email, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new ApiError(400, "Invalid email format");
  }

  const existedUser = await User.findOne({ email });
  if (existedUser) {
    throw new ApiError(400, "Email already exists");
  }

  const newUser = await User.create({
    name: username,
    email,
    password,
  });

  if (!newUser) {
    throw new ApiError(500, "Failed to create user");
  }

  res.status(201).json(new ApiResponse(201, "User registered successfully", {
    _id: newUser._id,
    name: newUser.name,
    email: newUser.email,
  }));
});

export {registerUser}