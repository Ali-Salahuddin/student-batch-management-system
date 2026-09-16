"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_middlewre_1 = require("../middleware/auth.middlewre");
const role_auth_middleware_1 = require("../middleware/role.auth.middleware");
const dashboard_controller_1 = require("../controllers/dashboard.controller");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get("/dashboard", auth_middlewre_1.authenticate, (0, role_auth_middleware_1.authorize)("admin"), dashboard_controller_1.dashboard);
exports.default = router;
