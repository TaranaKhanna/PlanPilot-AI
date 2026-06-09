import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import emotionRoutes from "./routes/emotionRoutes.js";
import historyRoutes from "./routes/historyRoutes.js";
import insightRoutes from "./routes/insightRoutes.js";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());
app.use("/uploads", express.static("uploads")
);

app.use("/api/emotion", emotionRoutes);
app.use("/api/history", historyRoutes);
app.use("/api/insights", insightRoutes);
connectDB();

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});