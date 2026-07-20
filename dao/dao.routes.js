import express from "express";

import {
  getOverview,
  getAnalytics,
  getTreasuryData,
  getActivity,
  getAllProposals,
  createNewProposal,
  voteOnProposal,
  getMemberProposals,
  getMemberGovernanceHistory,
  getProposalDetails,
} from "./dao.controller.js";

import { requireDAOAccess } from "../middleware/daoAuth.js";

const router = express.Router();

/*
=========================================================
DAO DASHBOARD
=========================================================
*/

router.post(
  "/overview",
  requireDAOAccess,
  getOverview
);

router.post(
  "/analytics",
  requireDAOAccess,
  getAnalytics
);

router.post(
  "/treasury",
  requireDAOAccess,
  getTreasuryData
);

router.post(
  "/activity",
  requireDAOAccess,
  getActivity
);

/*
=========================================================
PROPOSALS
=========================================================
*/

router.post(
  "/proposals",
  requireDAOAccess,
  getAllProposals
);

router.post(
  "/proposals/create",
  requireDAOAccess,
  createNewProposal
);

router.post(
  "/proposals/:id",
  requireDAOAccess,
  getProposalDetails
);

/*
=========================================================
VOTING
=========================================================
*/

router.post(
  "/vote",
  requireDAOAccess,
  voteOnProposal
);

/*
=========================================================
MEMBER DAO
=========================================================
*/

router.post(
  "/my-proposals",
  requireDAOAccess,
  getMemberProposals
);

router.post(
  "/governance-history",
  requireDAOAccess,
  getMemberGovernanceHistory
);

export default router;