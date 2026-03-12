import express from "express";
import cors from "cors";
import reputationRoutes from "./reputation/reputation.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/reputation", reputationRoutes);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});