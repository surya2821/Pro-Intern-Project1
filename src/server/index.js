import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import fundyRoutes from "./routes/fundy.js";
import dashboardRoutes from "./routes/DashboardRoutes.js";
import projectroutes from "./routes/projectroutes.js";
import { errorHandler } from "./middleware/errorHandler.js";

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/fundy", fundyRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/",projectroutes)

// Error handling
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
