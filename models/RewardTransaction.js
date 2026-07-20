import mongoose from "mongoose";

const RewardTransactionSchema = new mongoose.Schema(
  {
    /*
    ==========================
    OWNER
    ==========================
    */

    walletAddress: {
      type: String,
      required: true,
      index: true,
    },

    /*
    ==========================
    TOKEN TYPE
    ==========================
    */

    token: {
      type: String,
      enum: [
        "HIVE",
        "SET",
        "DAOCRAT",
      ],
      required: true,
    },

    /*
    ==========================
    TRANSACTION
    ==========================
    */

    amount: {
      type: Number,
      required: true,
    },

    balanceAfter: {
      type: Number,
      default: 0,
    },

    /*
    ==========================
    EVENT
    ==========================
    */

    type: {
      type: String,
      enum: [
        "Opportunity Reward",
        "Referral Bonus",
        "Daily Reward",
        "Community Bonus",
        "Mining Reward",
        "Governance Reward",
        "Admin Adjustment",
        "Withdrawal",
        "Conversion",
        "Penalty",
      ],
      required: true,
    },

    description: {
      type: String,
      default: "",
    },

    /*
    ==========================
    REFERENCES
    ==========================
    */

    opportunityId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
    },

    contributorId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
    },

    /*
    ==========================
    STATUS
    ==========================
    */

    status: {
      type: String,
      enum: [
        "Pending",
        "Completed",
        "Rejected",
      ],
      default: "Completed",
    },

    processedBy: {
      type: String,
      default: "",
    },

  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "RewardTransaction",
  RewardTransactionSchema
);