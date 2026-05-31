import { Router } from "express";
import {
  getUserData,
  loginUser,
  logoutUser,
  refreshToken,
  registerUser,
} from "../controllers/user.controller.js";
import verifyJWT from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route('/refresh-token').post(refreshToken);
 
//protected routes
router.route("/logout").post(verifyJWT, logoutUser);
router.route('/get-user').get(verifyJWT,getUserData);


export default router;
