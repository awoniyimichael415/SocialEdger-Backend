import mongoose from "mongoose";

const OpportunitySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    difficulty: {
      type: String,
      enum: [
        "Beginner",
        "Intermediate",
        "Advanced",
        "Expert",
      ],
      default: "Beginner",
    },

    requiredSkills: {
      type: [String],
      default: [],
    },

    /*
    =========================================
    REWARDS
    =========================================
    */

    hiveReward: {
      type: Number,
      default: 0,
    },

    setReward: {
      type: Number,
      default: 0,
    },

    daoCratReward: {
      type: Number,
      default: 0,
    },

    reputationReward: {
      type: Number,
      default: 0,
    },

    contributorsNeeded: {
      type: Number,
      default: 1,
    },

    applicants: [
      {
        walletAddress: String,
        username: String,
        appliedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    assignedContributors: [
      {
        walletAddress: String,
        username: String,
        assignedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    attachments: {
      type: [String],
      default: [],
    },

    referenceLinks: {
      type: [String],
      default: [],
    },

    applicationDeadline: Date,

    completionDeadline: Date,

    status: {
      type: String,
      enum: [
        "Open",
        "Reviewing",
        "Assigned",
        "Completed",
        "Closed",
      ],
      default: "Open",
    },

    createdBy: {
      type: String,
      default: "SocialEdger",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "Opportunity",
  OpportunitySchema
);