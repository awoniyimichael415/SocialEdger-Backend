import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import connectDB from "./config/database.js";

import kycRoutes from "./kyc/kyc.routes.js";
import adminRoutes from "./kyc/admin.routes.js";
import agreementRoutes from "./agreement/agreement.routes.js";
import miningRoutes from "./mining/mining.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

/*
REGISTER ROUTES
*/
app.use("/api/kyc", kycRoutes);
app.use("/api/admin/kyc", adminRoutes);
app.use("/api/agreement", agreementRoutes);
app.use("/api/mining", miningRoutes);

/*
START SERVER
*/
const startServer = async () => {

  await connectDB();

  app.listen(5000, () => {
    console.log("Backend running on port 5000");
  });

};

startServer();