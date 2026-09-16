"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middlewre_1 = require("../middleware/auth.middlewre");
const role_auth_middleware_1 = require("../middleware/role.auth.middleware");
const batches_controller_1 = require("../controllers/batches.controller");
const router = express_1.default.Router();
router.get("/:id/students", auth_middlewre_1.authenticate, (0, role_auth_middleware_1.authorize)("admin"), batches_controller_1.getBatchStudents);
router.get("/", auth_middlewre_1.authenticate, (0, role_auth_middleware_1.authorize)("admin"), batches_controller_1.getBatches);
router.post("/", auth_middlewre_1.authenticate, (0, role_auth_middleware_1.authorize)("admin"), batches_controller_1.createBatch);
router.get("/:id", batches_controller_1.getBatchById);
router.delete("/:id", auth_middlewre_1.authenticate, (0, role_auth_middleware_1.authorize)("admin"), batches_controller_1.deleteBatchById);
router.patch("/:id", auth_middlewre_1.authenticate, (0, role_auth_middleware_1.authorize)("admin"), batches_controller_1.updateBatch);
exports.default = router;
