import express from "express";

import {
  getRewards,
  getHistory,
  distribute,
  adminTransactions,
} from "./reward.controller.js";

import {
  requestWithdrawal,
  userWithdrawals,
  adminWithdrawals,
  approve,
  reject,
} from "./withdrawal.controller.js";

const router = express.Router();

/*
=========================================
ADMIN
=========================================
*/

router.get(
  "/admin/transactions",
  adminTransactions
);

router.get(
  "/admin/withdrawals",
  adminWithdrawals
);

/*
=========================================
REWARD DISTRIBUTION
=========================================
*/

router.post(
  "/distribute",
  distribute
);

/*
=========================================
WITHDRAWALS
=========================================
*/

router.post(
  "/withdrawals",
  requestWithdrawal
);

router.get(
  "/withdrawals/:wallet",
  userWithdrawals
);

router.put(
  "/withdrawals/:id/approve",
  approve
);

router.put(
  "/withdrawals/:id/reject",
  reject
);

/*
=========================================
MEMBER REWARDS
=========================================
*/

router.get(
  "/:wallet/history",
  getHistory
);

router.get(
  "/:wallet",
  getRewards
);

export default router;