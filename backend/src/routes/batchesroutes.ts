import express from "express";
import { authenticate } from "../middleware/auth.middlewre";
import { authorize } from "../middleware/role.auth.middleware";
import {
  getBatches,
  getBatchById,
  deleteBatchById,
  createBatch,
  updateBatch,
  getBatchStudents,
} from "../controllers/batches.controller";


const router = express.Router();

router.get(
  "/:id/students",
  authenticate,
  authorize("admin"),
  getBatchStudents
);
router.get("/", authenticate,authorize("admin"),getBatches);
router.post("/", authenticate,authorize("admin"),createBatch);
router.get("/:id", getBatchById);
router.delete(
  "/:id",
  authenticate,
  authorize("admin"),
  deleteBatchById
);
router.patch("/:id", authenticate, authorize("admin"), updateBatch);

export default router;