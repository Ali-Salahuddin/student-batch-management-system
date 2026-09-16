// import express from "express";
import { loggermw } from "./logger";
import batchesRoutes from "./routes/batchesroutes";
import authRoutes from "./routes/auth.routes";
import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import cookieParser from "cookie-parser";
import dashboardRoutes from "./routes/dboard.routes";
import cors from "cors";
import path from "path";
const app = express();

app.use(
  cors({
    origin: "http://localhost:31157",
    credentials: true,
  })
);
app.use(cookieParser());
dotenv.config();
connectDB();


app.use(loggermw);
app.use(express.json());


app.get("/", (req: Request, res: Response) => {
 
// res.send("Hello, World from Nofal");
// res.sendFile("index.html", { root: "./src/static" });
res.status(200).json({ message: "Success" });
 });
 app.use(cookieParser());
 app.use("/dboard", dashboardRoutes);
app.use("/batches", batchesRoutes);
app.use("/auth", authRoutes);
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

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