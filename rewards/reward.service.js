import RewardWallet from "../models/RewardWallet.js";
import RewardTransaction from "../models/RewardTransaction.js";
import { distributeRewards } from "./reward.engine.js";
import { transferSET } from "../blockchain/token.js";
/*
=========================================
GET REWARD WALLET
=========================================
*/

export async function getRewardWallet(walletAddress) {

  let wallet = await RewardWallet.findOne({
    walletAddress,
  });

  if (!wallet) {

    wallet = await RewardWallet.create({
      walletAddress,
    });

  }

  return wallet;

}

/*
=========================================
GET REWARD HISTORY
=========================================
*/

export async function getRewardHistory(walletAddress) {

  return await RewardTransaction.find({
    walletAddress,
  }).sort({
    createdAt: -1,
  });

}

/*
=========================================
GET ALL REWARD TRANSACTIONS
(Admin)
=========================================
*/

export async function getAllRewardTransactions() {

  return await RewardTransaction.find().sort({
    createdAt: -1,
  });

}

/*
=========================================
DISTRIBUTE REWARD
=========================================
*/

export async function rewardContributor({

  walletAddress,

  hive = 0,

  set = 0,

  daoCrat = 0,

  type,

  description,

  opportunityId = null,

  contributorId = null,

}) {

  /*
  =========================================
  BLOCKCHAIN SET TRANSFER
  =========================================
  */

  let blockchainTx = null;

  if (set > 0) {

    blockchainTx =
      await transferSET(
        walletAddress,
        BigInt(set) * 10n ** 18n
      );

  }

  /*
  =========================================
  DATABASE + REWARD ENGINE
  =========================================
  */

  const reward =
    await distributeRewards({

      walletAddress,

      hive,

      set,

      daoCrat,

      type,

      description,

      opportunityId,

      contributorId,

    });

  return {

    ...reward,

    blockchainTransaction:
      blockchainTx,

  };

}
/*
=========================================
GET REWARD SUMMARY
=========================================
*/

export async function getRewardSummary(walletAddress) {

  const wallet =
    await getRewardWallet(walletAddress);

  const history =
    await getRewardHistory(walletAddress);

  return {

    wallet,

    history,

    statistics: {

      totalTransactions:
        history.length,

      totalHiveEarned:
        wallet.totalHiveEarned,

      totalSetEarned:
        wallet.totalSetEarned,

      totalDaoCratEarned:
        wallet.totalDaoCratEarned,

      pendingSet:
        wallet.setPending,

      withdrawnSet:
        wallet.setWithdrawn,

    },

  };

}