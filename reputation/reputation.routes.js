import express from "express";

import {
  reputation,
  adminDashboard,
  leaderboard,
  contributors,
} from "./reputation.controller.js";

const router = express.Router();

/*
=================================================
ADMIN REPUTATION
=================================================
*/

router.get(
  "/admin/dashboard",
  adminDashboard
);

router.get(
  "/admin/leaderboard",
  leaderboard
);

router.get(
  "/admin/contributors",
  contributors
);

/*
=================================================
MEMBER REPUTATION
=================================================
*/

router.get(
  "/:wallet",
  reputation
);

export default router;