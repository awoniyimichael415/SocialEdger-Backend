import mongoose from "mongoose";

const WithdrawalRequestSchema = new mongoose.Schema(
  {
    walletAddress: {
      type: String,
      required: true,
      index: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    token: {
      type: String,
      enum: ["SET"],
      default: "SET",
    },

    status: {
      type: String,
      enum: [
        "Pending",
        "Approved",
        "Rejected",
        "Completed",
      ],
      default: "Pending",
    },

    transactionHash: {
      type: String,
      default: "",
    },

    adminNote: {
      type: String,
      default: "",
    },

    processedBy: {
      type: String,
      default: "",
    },

    processedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "WithdrawalRequest",
  WithdrawalRequestSchema
);