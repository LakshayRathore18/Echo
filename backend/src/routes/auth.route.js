import express from "express";
import {
  checkAuth,
  login,
  logout,
  signup,
  updateProfile,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
const router = express();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout); // Ensure this is a POST request

router.put("/update-profile", protectRoute, updateProfile);

router.get("/check", protectRoute, checkAuth);

export default router;
