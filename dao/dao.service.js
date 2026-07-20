import Proposal from "../models/Proposal.js";
import Vote from "../models/Vote.js";
import { isEligibleForDAO } from "../middleware/daoAuth.js";

/*
=========================================================
DAO OVERVIEW
=========================================================
*/

export const getDAOOverview = async () => {
  const totalProposals = await Proposal.countDocuments();

  const activeProposals = await Proposal.countDocuments({
    status: "Active",
  });

  const totalVotes = await Vote.countDocuments();

  const participationRate =
    totalProposals === 0
      ? 0
      : Number(
          (
            (totalVotes / totalProposals) *
            100
          ).toFixed(2)
        );

  return {
    totalProposals,
    activeProposals,
    totalVotes,
    participationRate,
  };
};

/*
=========================================================
VOTING ANALYTICS
=========================================================
*/

export const getVotingAnalytics = async () => {
  const totalVotes = await Vote.countDocuments();

  const approvedVotes = await Vote.countDocuments({
    decision: "Approve",
  });

  const rejectedVotes = await Vote.countDocuments({
    decision: "Reject",
  });

  const abstainedVotes = await Vote.countDocuments({
    decision: "Abstain",
  });

  const participationRate =
    totalVotes === 0
      ? 0
      : Number(
          (
            ((approvedVotes +
              rejectedVotes +
              abstainedVotes) /
              totalVotes) *
            100
          ).toFixed(2)
        );

  return {
    totalVotes,
    approvedVotes,
    rejectedVotes,
    abstainedVotes,
    participationRate,
  };
};

/*
=========================================================
ALL PROPOSALS
=========================================================
*/

export const getProposals = async () => {
  return await Proposal.find().sort({
    createdAt: -1,
  });
};

/*
=========================================================
CREATE PROPOSAL
=========================================================
*/

export const createProposal = async (
  data
) => {
  const eligible =
    await isEligibleForDAO(
      data.wallet
    );

  if (!eligible) {
    throw new Error(
      "Only Premium Members can create proposals."
    );
  }

  const proposal =
    await Proposal.create({
      title: data.title,
      description:
        data.description,
      category: data.category,
      startDate: Date.now(),
      endDate:
        Date.now() +
        7 *
          24 *
          60 *
          60 *
          1000,
      status: "Active",

      createdBy:
        data.wallet.toLowerCase(),

      totalVotes: 0,

      approvalVotes: 0,

      rejectionVotes: 0,

      abstainedVotes: 0,
    });

  return {
    success: true,
    message:
      "Proposal created successfully.",
    data: proposal,
  };
};

/*
=========================================================
TREASURY
=========================================================
*/

export const getTreasury =
  async () => {
    return {
      totalFunds: 0,
      allocatedFunds: 0,
      availableFunds: 0,
      totalExpenses: 0,
    };
  };

/*
=========================================================
LATEST GOVERNANCE ACTIVITY
=========================================================
*/

export const getGovernanceActivity =
  async () => {
    const latest =
      await Proposal.find()
        .sort({
          createdAt: -1,
        })
        .limit(10);

    return latest.map(
      (proposal) => ({
        _id: proposal._id,
        action:
          "Proposal Created",
        description:
          proposal.title,
        createdAt:
          proposal.createdAt,
      })
    );
  };

/*
=========================================================
VOTE ON PROPOSAL
=========================================================
*/

export const voteProposal = async ({
  wallet,
  proposalId,
  decision,
}) => {
  const eligible = await isEligibleForDAO(wallet);

  if (!eligible) {
    throw new Error(
      "Only Premium Members can vote."
    );
  }

  const proposal = await Proposal.findById(proposalId);

  if (!proposal) {
    throw new Error("Proposal not found.");
  }

  if (proposal.status !== "Active") {
    throw new Error(
      "Voting for this proposal has closed."
    );
  }

  const existingVote = await Vote.findOne({
    proposal: proposalId,
    walletAddress: wallet.toLowerCase(),
  });

  if (existingVote) {
    throw new Error(
      "You have already voted on this proposal."
    );
  }

  await Vote.create({
    proposal: proposalId,
    walletAddress: wallet.toLowerCase(),
    decision,
    votingPower: 1,
  });

  proposal.totalVotes += 1;

  switch (decision) {
    case "Approve":
      proposal.approvalVotes += 1;
      break;

    case "Reject":
      proposal.rejectionVotes += 1;
      break;

    case "Abstain":
      proposal.abstainedVotes += 1;
      break;
  }

  await proposal.save();

  return {
    success: true,
    message: "Vote submitted successfully.",
  };
};

/*
=========================================================
MY PROPOSALS
=========================================================
*/

export const getMyProposals = async (
  wallet
) => {
  return await Proposal.find({
    createdBy: wallet.toLowerCase(),
  }).sort({
    createdAt: -1,
  });
};

/*
=========================================================
GOVERNANCE HISTORY
=========================================================
*/

export const getGovernanceHistory =
  async (wallet) => {
    const votes = await Vote.find({
      walletAddress: wallet.toLowerCase(),
    })
      .populate("proposal")
      .sort({
        createdAt: -1,
      });

    return votes.map((vote) => ({
      _id: vote._id,
      type: "Vote",
      title:
        vote.proposal?.title ??
        "Unknown Proposal",
      action: vote.decision,
      status:
        vote.proposal?.status ??
        "Unknown",
      createdAt: vote.createdAt,
    }));
  };

/*
=========================================================
PROPOSAL DETAILS
=========================================================
*/

export const getProposalById =
  async (proposalId) => {
    const proposal =
      await Proposal.findById(
        proposalId
      );

    if (!proposal) {
      throw new Error(
        "Proposal not found."
      );
    }

    return proposal;
  };