import mongoose from "mongoose";

const RewardWalletSchema = new mongoose.Schema(
  {
    walletAddress: {
      type: String,
      required: true,
      unique: true,
    },

    /*
    ==========================
    PLATFORM BALANCES
    ==========================
    */

    hiveBalance: {
      type: Number,
      default: 0,
    },

    daoCratBalance: {
      type: Number,
      default: 0,
    },

    /*
    ==========================
    SET TRACKING
    ==========================
    */

    setEarned: {
      type: Number,
      default: 0,
    },

    setWithdrawn: {
      type: Number,
      default: 0,
    },

    setPending: {
      type: Number,
      default: 0,
    },

    /*
    ==========================
    LIFETIME TOTALS
    ==========================
    */

    totalHiveEarned: {
      type: Number,
      default: 0,
    },

    totalDaoCratEarned: {
      type: Number,
      default: 0,
    },

    totalSetEarned: {
      type: Number,
      default: 0,
    },

    /*
    ==========================
    STATUS
    ==========================
    */

    lastRewardAt: Date,

    lastWithdrawalAt: Date,

  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "RewardWallet",
  RewardWalletSchema
);