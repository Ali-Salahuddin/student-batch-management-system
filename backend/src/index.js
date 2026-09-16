"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import express from "express";
const logger_1 = require("./logger");
const batchesroutes_1 = __importDefault(require("./routes/batchesroutes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./config/db");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dboard_routes_1 = __importDefault(require("./routes/dboard.routes"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    // origin: "http://localhost:5173",
    origin: "http://localhost:31157",
    credentials: true,
}));
app.use((0, cookie_parser_1.default)());
dotenv_1.default.config();
(0, db_1.connectDB)();
app.use(logger_1.loggermw);
app.use(express_1.default.json());
app.get("/", (req, res) => {
    // res.send("Hello, World from Nofal");
    // res.sendFile("index.html", { root: "./src/static" });
    res.status(200).json({ message: "Success" });
});
app.use((0, cookie_parser_1.default)());
app.use("/dboard", dboard_routes_1.default);
app.use("/batches", batchesroutes_1.default);
app.use("/auth", auth_routes_1.default);
app.use("/uploads", express_1.default.static(path_1.default.join(__dirname, "../uploads")));
app.listen(4000, () => {
    console.log("Server is running on port 4000");
});
// import express, { Request, Response } from "express";
// import { batches } from "../data/batches";
// const app = express();
// const PORT = 3000;
// app.get("/", (req: Request, res: Response) => {
//     // console.log(req);
//   res.send("Hello, World from Nofal");
// });
// app.get("/raahim", (req: Request, res: Response) => {
//   res.send("Hello, World from Raahim");
// });
// app.get("/batches/:id", (req, res) => {
//   const batch = batches.find(
//     (b) => b.id === Number(req.params.id)
//   );
//   if (!batch) {
//     return res.status(404).json({
//       message: "Batch not found",
//     });
//   }
//   res.json(batch);
// });
// app.get("/batches", (req, res) => {
//   res.json(batches);
// });
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
