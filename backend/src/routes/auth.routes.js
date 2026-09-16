"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const register_controller_1 = require("../controllers/register.controller");
const auth_middlewre_1 = require("../middleware/auth.middlewre");
const role_auth_middleware_1 = require("../middleware/role.auth.middleware");
const login_controller_1 = require("../controllers/login.controller");
const profile_controller_1 = require("../controllers/profile.controller");
const logout_controller_1 = require("../controllers/logout.controller");
const upload_1 = __importDefault(require("../upload/upload"));
const router = express_1.default.Router();
// router.post(
//   "/register",
//   registerUser
// );
router.post("/register", upload_1.default.single("profileImage"), register_controller_1.registerUser);
router.post("/users", auth_middlewre_1.authenticate, (0, role_auth_middleware_1.authorize)("admin"), upload_1.default.single("profileImage"), register_controller_1.registerUser);
router.post("/login", login_controller_1.loginUser);
router.post("/logout", logout_controller_1.logout);
// router.get(
//   "/users",
//   getUsers
// );
router.get("/users", auth_middlewre_1.authenticate, (0, role_auth_middleware_1.authorize)("admin"), register_controller_1.getUsers);
// router.get("/users", getUsers);
router.patch("/users/:id", auth_middlewre_1.authenticate, (0, role_auth_middleware_1.authorize)("admin"), upload_1.default.single("profileImage"), register_controller_1.updateUser);
router.get("/profile", auth_middlewre_1.authenticate, profile_controller_1.getProfile);
router.delete("/users/:id", auth_middlewre_1.authenticate, (0, role_auth_middleware_1.authorize)("admin"), register_controller_1.deleteUser);
exports.default = router;
