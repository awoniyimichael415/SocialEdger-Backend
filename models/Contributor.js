import mongoose from "mongoose";

const ContributorSchema = new mongoose.Schema(
  {
    walletAddress: {
      type: String,
      required: true,
      unique: true,
    },

    displayName: {
      type: String,
      required: true,
    },

    username: {
      type: String,
      required: true,
      unique: true,
    },

    bio: {
      type: String,
      default: "",
    },

    country: {
      type: String,
      default: "",
    },

    category: {
      type: String,
      default: "",
    },

    skills: {
      type: [String],
      default: [],
    },

    portfolioLinks: {
      type: [String],
      default: [],
    },

    website: {
      type: String,
      default: "",
    },

    linkedin: {
      type: String,
      default: "",
    },

    twitter: {
      type: String,
      default: "",
    },

    profileImage: {
      type: String,
      default: "",
    },

    membershipType: {
      type: String,
      enum: [
        "Contributor",
        "Premium",
        "Primary",
        "Secondary",
      ],
      default: "Contributor",
    },

    /*
    =====================================
    ADMIN
    =====================================
    */

    verified: {
      type: Boolean,
      default: false,
    },

    verifiedAt: {
      type: Date,
      default: null,
    },

    accountStatus: {
      type: String,
      enum: [
        "Active",
        "Pending",
        "Suspended",
        "Banned",
      ],
      default: "Pending",
    },

    suspendedReason: {
      type: String,
      default: "",
    },

    suspendedAt: {
      type: Date,
      default: null,
    },

    lastLogin: {
      type: Date,
      default: null,
    },

    adminNotes: {
      type: String,
      default: "",
    },

    /*
    =====================================
    REPUTATION ENGINE
    =====================================
    */

    totalReputation: {
      type: Number,
      default: 0,
    },

    contributorLevel: {
      type: Number,
      default: 1,
    },

    daoVotingWeight: {
      type: Number,
      default: 0,
    },

    /*
    =====================================
    REWARDS
    =====================================
    */

    totalHiveEarned: {
      type: Number,
      default: 0,
    },

    totalSetEarned: {
      type: Number,
      default: 0,
    },

    totalDaoCratEarned: {
      type: Number,
      default: 0,
    },

    /*
    =====================================
    OPPORTUNITIES
    =====================================
    */

    totalApplications: {
      type: Number,
      default: 0,
    },

    totalApproved: {
      type: Number,
      default: 0,
    },

    totalCompleted: {
      type: Number,
      default: 0,
    },

    totalRejected: {
      type: Number,
      default: 0,
    },

    activeOpportunities: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Opportunity",
      },
    ],

    completedOpportunities: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Opportunity",
      },
    ],

    /*
    =====================================
    PORTFOLIO
    =====================================
    */

    portfolioProjects: [
      {
        title: String,
        description: String,
        image: String,
        projectUrl: String,
        completedAt: Date,
      },
    ],

    /*
    =====================================
    HISTORY
    =====================================
    */

    contributionHistory: [
      {
        title: String,
        type: String,
        reputation: Number,
        reward: Number,
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    /*
    =====================================
    ACHIEVEMENTS
    =====================================
    */

    badges: {
      type: [String],
      default: [],
    },

    achievements: {
      type: [String],
      default: [],
    },

    /*
    =====================================
    SOCIAL
    =====================================
    */

    profileViews: {
      type: Number,
      default: 0,
    },

    endorsements: {
      type: Number,
      default: 0,
    },

    followers: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "Contributor",
  ContributorSchema
);