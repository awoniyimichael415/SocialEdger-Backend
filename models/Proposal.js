import mongoose from "mongoose";

/*
=========================================================
SocialEdger DAO Proposal Schema
=========================================================
*/

const ProposalSchema = new mongoose.Schema(

  {

    title: {

      type: String,

      required: true,

      trim: true,

    },

    description: {

      type: String,

      required: true,

    },

    category: {

      type: String,

      default: "Governance",

      enum: [

        "Governance",

        "Treasury",

        "Membership",

        "Rewards",

        "Protocol Upgrade",

      ],

    },

    status: {

      type: String,

      default: "Draft",

      enum: [

        "Draft",

        "Active",

        "Passed",

        "Rejected",

        "Executed",

      ],

    },

    startDate: {

      type: Number,

      required: true,

    },

    endDate: {

      type: Number,

      required: true,

    },

    totalVotes: {

      type: Number,

      default: 0,

    },

    approvalVotes: {

      type: Number,

      default: 0,

    },

    rejectionVotes: {

      type: Number,

      default: 0,

    },

    abstainedVotes: {

      type: Number,

      default: 0,

    },

    createdBy: {

      type: String,

      default: "Administrator",

    },

    executedAt: {

      type: Date,

      default: null,

    },

    transactionHash: {

      type: String,

      default: "",

    },

  },

  {

    timestamps: true,

  }

);

export default mongoose.model(

  "Proposal",

  ProposalSchema

);