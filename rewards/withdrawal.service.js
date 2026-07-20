import WithdrawalRequest from "../models/WithdrawalRequest.js";
import RewardWallet from "../models/RewardWallet.js";

/*
=========================================
CREATE WITHDRAWAL REQUEST
=========================================
*/

export async function createWithdrawalRequest({
  walletAddress,
  amount,
}) {

  const wallet = await RewardWallet.findOne({
    walletAddress,
  });

  if (!wallet) {
    throw new Error("Reward wallet not found.");
  }

  if (amount <= 0) {
    throw new Error("Invalid withdrawal amount.");
  }

  if (wallet.setPending < amount) {
    throw new Error("Insufficient pending SET.");
  }

  const request =
    await WithdrawalRequest.create({

      walletAddress,

      amount,

      token: "SET",

    });

  return request;

}

/*
=========================================
GET USER WITHDRAWALS
=========================================
*/

export async function getUserWithdrawals(
  walletAddress
) {

  return await WithdrawalRequest.find({

    walletAddress,

  }).sort({

    createdAt: -1,

  });

}

/*
=========================================
GET ALL WITHDRAWALS
(Admin)
=========================================
*/

export async function getAllWithdrawals() {

  return await WithdrawalRequest.find().sort({

    createdAt: -1,

  });

}

/*
=========================================
APPROVE WITHDRAWAL
(Admin)
=========================================
*/

export async function approveWithdrawal(
  id,
  admin
) {

  const request =
    await WithdrawalRequest.findById(id);

  if (!request) {
    throw new Error("Request not found.");
  }

  if (request.status !== "Pending") {
    throw new Error(
      "Request already processed."
    );
  }

  const wallet =
    await RewardWallet.findOne({

      walletAddress:
        request.walletAddress,

    });

  if (!wallet) {
    throw new Error("Reward wallet not found.");
  }

  wallet.setPending -= request.amount;

  wallet.setWithdrawn +=
    request.amount;

  wallet.lastWithdrawalAt =
    new Date();

  await wallet.save();

  request.status = "Approved";

  request.processedBy = admin;

  request.processedAt =
    new Date();

  await request.save();

  return request;

}

/*
=========================================
REJECT WITHDRAWAL
(Admin)
=========================================
*/

export async function rejectWithdrawal(
  id,
  admin,
  note = ""
) {

  const request =
    await WithdrawalRequest.findById(id);

  if (!request) {
    throw new Error("Request not found.");
  }

  request.status = "Rejected";

  request.processedBy = admin;

  request.adminNote = note;

  request.processedAt =
    new Date();

  await request.save();

  return request;

}