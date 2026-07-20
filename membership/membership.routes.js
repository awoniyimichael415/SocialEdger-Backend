import express from "express";

import {

  getNFTs,

  summary,

  analytics,

  queue,

  mint,

  addShared,

  metadata,

} from "./membership.controller.js";

const router = express.Router();

/*
=========================================
ADMIN MEMBERSHIP
=========================================
*/

router.get(
  "/admin/nfts",
  getNFTs
);

router.get(
  "/admin/summary",
  summary
);

router.get(
  "/admin/analytics",
  analytics
);

router.get(
  "/admin/queue",
  queue
);

/*
=========================================
MEMBERSHIP ACTIONS
=========================================
*/

router.post(
  "/mint",
  mint
);

router.post(
  "/shared/add",
  addShared
);

router.post(
  "/metadata",
  metadata
);

export default router;