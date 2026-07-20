import mongoose from "mongoose";

/*
=========================================================
SocialEdger DAO Vote Schema
=========================================================
*/

const VoteSchema = new mongoose.Schema(

  {

    proposal: {

      type: mongoose.Schema.Types.ObjectId,

      ref: "Proposal",

      required: true,

    },

    walletAddress: {

      type: String,

      required: true,

      lowercase: true,

      trim: true,

    },

    decision: {

      type: String,

      required: true,

      enum: [

        "Approve",

        "Reject",

        "Abstain",

      ],

    },

    votingPower: {

      type: Number,

      default: 1,

    },

    transactionHash: {

      type: String,

      default: "",

    },

    blockNumber: {

      type: Number,

      default: 0,

    },

    network: {

      type: String,

      default: "Sepolia",

    },

    remarks: {

      type: String,

      default: "",

    },

  },

  {

    timestamps: true,

  }

);

/*
=========================================================
PREVENT DUPLICATE VOTING
One wallet can vote only once per proposal
=========================================================
*/

VoteSchema.index(

  {

    proposal: 1,

    walletAddress: 1,

  },

  {

    unique: true,

  }

);

export default mongoose.model(

  "Vote",

  VoteSchema

);