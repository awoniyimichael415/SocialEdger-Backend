import {
  getRewardSummary,
  getRewardHistory,
  rewardContributor,
  getAllRewardTransactions,
} from "./reward.service.js";

/*
=========================================
GET REWARD DASHBOARD
GET /api/rewards/:wallet
=========================================
*/

export const getRewards = async (req, res) => {

  try {

    const wallet = req.params.wallet;

    const rewards =
      await getRewardSummary(wallet);

    res.json(rewards);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Failed to load rewards.",
    });

  }

};

/*
=========================================
GET REWARD HISTORY
GET /api/rewards/:wallet/history
=========================================
*/

export const getHistory = async (req, res) => {

  try {

    const wallet = req.params.wallet;

    const history =
      await getRewardHistory(wallet);

    res.json(history);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Failed to load reward history.",
    });

  }

};

/*
=========================================
GET ALL REWARD TRANSACTIONS
(Admin)
GET /api/rewards/admin/transactions
=========================================
*/

export const adminTransactions = async (
  req,
  res
) => {

  try {

    const transactions =
      await getAllRewardTransactions();

    res.json(transactions);

  } catch (error) {

    console.error(error);

    res.status(500).json({

      success: false,

      error: error.message,

    });

  }

};

/*
=========================================
DISTRIBUTE REWARD
POST /api/rewards/distribute
(Admin / System)
=========================================
*/

export const distribute = async (
  req,
  res
) => {

  try {

    const reward =
      await rewardContributor(req.body);

    res.json({

      success: true,

      message:
        "Reward distributed successfully.",

      blockchainTransaction:
        reward.blockchainTransaction,

      reward,

    });

  } catch (error) {

    console.error(error);

    res.status(500).json({

      success: false,

      error: error.message,

    });

  }

};