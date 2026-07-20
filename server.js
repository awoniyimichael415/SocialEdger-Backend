import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import connectDB from "./config/database.js";

import kycRoutes from "./kyc/kyc.routes.js";
import adminRoutes from "./kyc/admin.routes.js";
import agreementRoutes from "./agreement/agreement.routes.js";
import miningRoutes from "./mining/mining.routes.js";
import postRoutes from "./routes/post.routes.js";
import uploadRoutes from "./routes/upload.routes.js";
import contributorRoutes from "./contributors/contributor.routes.js";
import opportunityRoutes from "./opportunities/opportunity.routes.js";
import applicationRoutes from "./opportunities/application.routes.js";
import rewardRoutes from "./rewards/reward.routes.js";
import presaleRoutes from "./presale/presale.routes.js";
import daoRoutes from "./dao/dao.routes.js";
import reputationRoutes from "./reputation/reputation.routes.js";


const app = express();

BigInt.prototype.toJSON = function () {
  return this.toString();
};

app.use(cors());
app.use(express.json());

/*
REGISTER ROUTES
*/
app.use("/api/kyc", kycRoutes);
app.use("/api/admin/kyc", adminRoutes);
app.use("/api/agreement", agreementRoutes);
app.use("/api/mining", miningRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/contributors", contributorRoutes);
app.use("/api/opportunities", opportunityRoutes);
app.use("/api/opportunity-applications", applicationRoutes);
app.use("/api/rewards", rewardRoutes);
app.use("/api/presale", presaleRoutes);
app.use("/api/dao", daoRoutes);
app.use("/api/reputation", reputationRoutes);

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