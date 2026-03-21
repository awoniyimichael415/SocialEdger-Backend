import express from "express";

import {
  startMiningController,
  claimRewardController
} from "./mining.controller.js";

const router = express.Router();

router.post("/start", startMiningController);

router.post("/claim", claimRewardController);

export default router;