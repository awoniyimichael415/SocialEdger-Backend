import mongoose from "mongoose";

const OpportunityApplicationSchema = new mongoose.Schema(
  {
    opportunityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Opportunity",
      required: true,
    },

    walletAddress: {
      type: String,
      required: true,
    },

    username: {
      type: String,
      required: true,
    },

    coverLetter: {
      type: String,
      default: "",
    },

    portfolioLinks: {
      type: [String],
      default: [],
    },

    status: {
      type: String,
      enum: [
        "Pending",
        "Approved",
        "Rejected",
        "Assigned",
        "Completed",
      ],
      default: "Pending",
    },

    adminFeedback: {
      type: String,
      default: "",
    },

    submittedWork: {
      type: String,
      default: "",
    },

    /*
    =========================================
    REWARD TRACKING
    =========================================
    */

    hiveRewardPaid: {
      type: Boolean,
      default: false,
    },

    setRewardPaid: {
      type: Boolean,
      default: false,
    },

    daoCratRewardPaid: {
      type: Boolean,
      default: false,
    },

    reputationAwarded: {
      type: Boolean,
      default: false,
    },

    rewardTransactionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RewardTransaction",
      default: null,
    },

    completedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "OpportunityApplication",
  OpportunityApplicationSchema
);