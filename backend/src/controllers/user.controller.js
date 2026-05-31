import asyncHandler from "../utils/AsyncHandler.js";
import { User } from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import jwt from 'jsonwebtoken'

const options={
    httpOnly:true,
    secure:true,
    sameSite:"strict"
  }

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save();
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500,error.message||"Error in token generation",errors .push(error));
  }
};

const registerUser = asyncHandler(async (req, res) => {
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
  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(newUser._id);

  res.status(201)
  .cookie("accessToken",accessToken,options)
  .cookie("refreshToken",refreshToken,options)
  .json(new ApiResponse(201,{
    _id: newUser._id,
    name: newUser.name,
    email: newUser.email,
    avatar:newUser.avatar
  },"User registered successfully"));
});

const loginUser = asyncHandler(async(req,res)=>{
 // get details through req body 
 // validate details 
 // verify details 
 // check password
 // generateTokens
 // give access and send response

  const {email,password}=req.body;

  if(!email.trim() ||!password.trim() || typeof password !=='string' || typeof email !== 'string'){
    throw new ApiError( 400,"Invalid credentials")
  }
  const user= await User.findOne({email});
  if(!user){
    throw new ApiError(400,"User not found")
  }
  const isPasswordMatch= await user.isPasswordCorrect(password);
  if(!isPasswordMatch){
    throw new ApiError(400,"Invalid password");
  }
  const {accessToken,refreshToken}= await generateAccessAndRefreshTokens(user._id);
  
  const loggedInUser= await User.findById(user._id).select("-password -refreshToken");
  

  res.status(200)
  .cookie("accessToken",accessToken,options)
  .cookie("refreshToken",refreshToken,options)
  .json(new ApiResponse(200,loggedInUser,"Login successful"))

})

const logoutUser=asyncHandler(async(req,res)=>{
  const userId=req.user._id;
  const user= await User.findByIdAndUpdate(userId,
    {
      $unset:{refreshToken:1}
    },
    { new: true }
  );
  if(!user){
    throw new ApiError(400,"User not found")
  }
  
  res.status(200)
  .clearCookie("accessToken")
  .clearCookie("refreshToken")
  .json(new ApiResponse(200,{},"Logout successfully"))
});

const getUserData=asyncHandler(async (req,res) => {
  const userId=req.user._id;
  const user=await User.findById(userId).select("-password -refreshToken")
  if(!user){
    throw new ApiError(401,"Unauthorized Access");
  }
  res.status(201)
  .json(new ApiResponse(200,user,"User fetched Successfully"))
})

const refreshToken=asyncHandler(async(req,res)=>{
  const token= req.cookies?.refreshToken ||req.body?.refreshToken;
  if(!token){
    throw new ApiError(401,"Unauthorized Access")
  }
  try {
    const decodedInfo= jwt.verify(token,process.env.REFRESH_TOKEN_SECRET)
    if(!decodedInfo?._id){
      throw new ApiError(401,"Invalid token");
    }
    const user=await User.findById(decodedInfo._id);
    if(!user || user.refreshToken !== token){
      throw new ApiError(401,"Invalid token")
    }

    const {accessToken,refreshToken}= await generateAccessAndRefreshTokens(user._id);

    res.status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(new ApiResponse(200,{
      refreshToken
    },"Token refreshed successfully"))
  } catch (error) {
    throw new  ApiError(401,error?.message|| "Invalid refresh token")
  }
})
export {registerUser, loginUser, logoutUser,getUserData,refreshToken}