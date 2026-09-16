import express from "express";
import {
  registerUser,
  getUsers,
  updateUser,
   deleteUser
} from "../controllers/register.controller";
import { authenticate } from "../middleware/auth.middlewre";
import { authorize } from "../middleware/role.auth.middleware";
import { loginUser } from "../controllers/login.controller";
import { createBatch } from "../controllers/batches.controller";
import { getProfile } from "../controllers/profile.controller";
import { logout } from "../controllers/logout.controller";
import upload from "../upload/upload";

const router = express.Router();

// router.post(
//   "/register",
//   registerUser
// );
router.post(
  "/register",
  upload.single("profileImage"),
  registerUser
);
router.post(
  "/users",
  authenticate,
  authorize("admin"),
  upload.single("profileImage"),
  registerUser
);
router.post(
  "/login",
  loginUser
);
router.post("/logout", logout);
// router.get(
//   "/users",
//   getUsers
// );
router.get("/users", 
  authenticate, 
  authorize("admin"),getUsers);
  // router.get("/users", getUsers);
router.patch(
    "/users/:id",
    authenticate,
    authorize("admin"),
    upload.single("profileImage"),
    updateUser
);
router.get(
  "/profile",
  authenticate,
  getProfile
);
router.delete(
  "/users/:id",
  authenticate,
  authorize("admin"),
  deleteUser
);

export default router;