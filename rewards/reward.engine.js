import RewardWallet from "../models/RewardWallet.js";
import RewardTransaction from "../models/RewardTransaction.js";

/*
=========================================
GET OR CREATE WALLET
=========================================
*/

async function getWallet(walletAddress) {

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
RECORD TRANSACTION
=========================================
*/

async function createTransaction({
  walletAddress,
  token,
  amount,
  balanceAfter,
  type,
  description,
  opportunityId = null,
  contributorId = null,
}) {

  await RewardTransaction.create({

    walletAddress,

    token,

    amount,

    balanceAfter,

    type,

    description,

    opportunityId,

    contributorId,

    status: "Completed",

  });

}

/*
=========================================
DISTRIBUTE REWARDS
=========================================
*/

export async function distributeRewards({

  walletAddress,

  hive = 0,

  set = 0,

  daoCrat = 0,

  type = "Opportunity Reward",

  description = "",

  opportunityId = null,

  contributorId = null,

}) {

  const wallet =
    await getWallet(walletAddress);

  /*
  =========================================
  HIVE
  =========================================
  */

  if (hive > 0) {

    wallet.hiveBalance += hive;

    wallet.totalHiveEarned += hive;

    await createTransaction({

      walletAddress,

      token: "HIVE",

      amount: hive,

      balanceAfter:
        wallet.hiveBalance,

      type,

      description,

      opportunityId,

      contributorId,

    });

  }

  /*
  =========================================
  DAOCRAT
  =========================================
  */

  if (daoCrat > 0) {

    wallet.daoCratBalance += daoCrat;

    wallet.totalDaoCratEarned +=
      daoCrat;

    await createTransaction({

      walletAddress,

      token: "DAOCRAT",

      amount: daoCrat,

      balanceAfter:
        wallet.daoCratBalance,

      type,

      description,

      opportunityId,

      contributorId,

    });

  }

  /*
  =========================================
  SET
  =========================================
  */

  if (set > 0) {

    wallet.setPending += set;

    wallet.setEarned += set;

    wallet.totalSetEarned += set;

    await createTransaction({

      walletAddress,

      token: "SET",

      amount: set,

      balanceAfter:
        wallet.setPending,

      type,

      description,

      opportunityId,

      contributorId,

    });

  }

  wallet.lastRewardAt =
    new Date();

  await wallet.save();

  return wallet;

}