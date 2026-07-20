import RewardTransaction from "../models/RewardTransaction.js";

/*
=========================================
GET RECENT REWARD HISTORY
=========================================
*/

export async function getRecentRewardHistory(
  walletAddress,
  limit = 20
) {

  return await RewardTransaction.find({
    walletAddress,
  })
    .sort({
      createdAt: -1,
    })
    .limit(limit);

}

/*
=========================================
GET REWARD HISTORY BY TOKEN
=========================================
*/

export async function getRewardHistoryByToken(
  walletAddress,
  token
) {

  return await RewardTransaction.find({

    walletAddress,

    token,

  }).sort({

    createdAt: -1,

  });

}

/*
=========================================
GET REWARD HISTORY BY TYPE
=========================================
*/

export async function getRewardHistoryByType(
  walletAddress,
  type
) {

  return await RewardTransaction.find({

    walletAddress,

    type,

  }).sort({

    createdAt: -1,

  });

}

/*
=========================================
GET LATEST REWARD
=========================================
*/

export async function getLatestReward(
  walletAddress
) {

  return await RewardTransaction.findOne({

    walletAddress,

  }).sort({

    createdAt: -1,

  });

}