import { authenticate } from "../middleware/auth.middlewre";
import { authorize } from "../middleware/role.auth.middleware";
import {dashboard} from "../controllers/dashboard.controller";
import express from "express";
const router = express.Router();
router.get(
    "/dashboard",
    authenticate,
    authorize("admin"),
    dashboard
);
export default router;