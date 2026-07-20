/*
=========================================================
SocialEdger Presale Routes
=========================================================
*/

import express from "express";

import {

  currentPhase,

  summary,

  remaining,

  participant,

  createPhase,

  activatePhase,

  purchaseLimits,

  withdraw,

} from "./presale.controller.js";

const router = express.Router();

/*
=========================================================
PUBLIC INFORMATION
=========================================================
*/

router.get(
  "/current-phase",
  currentPhase
);

router.get(
  "/summary",
  summary
);

router.get(
  "/remaining",
  remaining
);

router.get(
  "/participant/:wallet",
  participant
);

/*
=========================================================
ADMIN ACTIONS
=========================================================
*/

router.post(
  "/create-phase",
  createPhase
);

router.post(
  "/activate-phase",
  activatePhase
);

router.post(
  "/purchase-limits",
  purchaseLimits
);

router.post(
  "/withdraw-eth",
  withdraw
);

export default router;