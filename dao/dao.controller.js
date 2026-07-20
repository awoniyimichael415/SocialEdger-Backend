import {
  getDAOOverview,
  getVotingAnalytics,
  getTreasury,
  getGovernanceActivity,
  getProposals,
  createProposal,
  voteProposal,
  getMyProposals,
  getGovernanceHistory,
  getProposalById,
} from "./dao.service.js";

/*
=========================================================
DAO OVERVIEW
=========================================================
*/

export const getOverview = async (req, res) => {
  try {
    const data = await getDAOOverview();

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
=========================================================
VOTING ANALYTICS
=========================================================
*/

export const getAnalytics = async (req, res) => {
  try {
    const data = await getVotingAnalytics();

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
=========================================================
TREASURY
=========================================================
*/

export const getTreasuryData = async (req, res) => {
  try {
    const data = await getTreasury();

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
=========================================================
GOVERNANCE ACTIVITY
=========================================================
*/

export const getActivity = async (req, res) => {
  try {
    const data = await getGovernanceActivity();

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
=========================================================
GET ALL PROPOSALS
=========================================================
*/

export const getAllProposals = async (req, res) => {
  try {
    const data = await getProposals();

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
=========================================================
CREATE PROPOSAL
=========================================================
*/

export const createNewProposal = async (req, res) => {
  try {
    const result = await createProposal(req.body);

    return res.status(201).json(result);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
=========================================================
VOTE
=========================================================
*/

export const voteOnProposal = async (req, res) => {
  try {
    const result = await voteProposal(req.body);

    return res.status(200).json(result);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
=========================================================
MY PROPOSALS
=========================================================
*/

export const getMemberProposals = async (req, res) => {
  try {
    const { wallet } = req.body;

    const data = await getMyProposals(wallet);

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
=========================================================
GOVERNANCE HISTORY
=========================================================
*/

export const getMemberGovernanceHistory = async (
  req,
  res
) => {
  try {
    const { wallet } = req.body;

    const data = await getGovernanceHistory(wallet);

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
=========================================================
PROPOSAL DETAILS
=========================================================
*/

export const getProposalDetails = async (
  req,
  res
) => {
  try {
    const data = await getProposalById(
      req.params.id
    );

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};