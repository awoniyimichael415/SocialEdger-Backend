/*
=========================================================
SocialEdger Presale Controller
=========================================================
*/

import {

  getCurrentPhase,

  getPresaleSummary,

  getRemainingTokens,

  getParticipant,

  createPresalePhase,

  activatePresalePhase,

  updateLimits,

  withdrawPresaleETH,

} from "./presale.service.js";

/*
=========================================================
GET CURRENT PHASE
GET /api/presale/current-phase
=========================================================
*/

export const currentPhase = async (
  req,
  res
) => {

  try {

    const phase =
      await getCurrentPhase();

    res.json(phase);

  } catch (error) {

    console.error(error);

    res.status(500).json({

      success: false,

      error: error.message,

    });

  }

};

/*
=========================================================
GET SUMMARY
GET /api/presale/summary
=========================================================
*/

export const summary = async (
  req,
  res
) => {

  try {

    const data =
      await getPresaleSummary();

    res.json(data);

  } catch (error) {

    console.error(error);

    res.status(500).json({

      success: false,

      error: error.message,

    });

  }

};

/*
=========================================================
GET REMAINING TOKENS
GET /api/presale/remaining
=========================================================
*/

export const remaining = async (
  req,
  res
) => {

  try {

    const balance =
      await getRemainingTokens();

    res.json({

      remainingTokens:
        balance,

    });

  } catch (error) {

    console.error(error);

    res.status(500).json({

      success: false,

      error: error.message,

    });

  }

};

/*
=========================================================
GET PARTICIPANT
GET /api/presale/participant/:wallet
=========================================================
*/

export const participant = async (
  req,
  res
) => {

  try {

    const data =
      await getParticipant(
        req.params.wallet
      );

    res.json(data);

  } catch (error) {

    console.error(error);

    res.status(500).json({

      success: false,

      error: error.message,

    });

  }

};

/*
=========================================================
CREATE PHASE
POST /api/presale/create-phase
=========================================================
*/

export const createPhase = async (
  req,
  res
) => {

  try {

    const result =
      await createPresalePhase(
        req.body
      );

    res.json(result);

  } catch (error) {

    console.error(error);

    res.status(500).json({

      success: false,

      error: error.message,

    });

  }

};

/*
=========================================================
ACTIVATE PHASE
POST /api/presale/activate-phase
=========================================================
*/

export const activatePhase = async (
  req,
  res
) => {

  try {

    const result =
      await activatePresalePhase(
        req.body.phaseId
      );

    res.json(result);

  } catch (error) {

    console.error(error);

    res.status(500).json({

      success: false,

      error: error.message,

    });

  }

};

/*
=========================================================
UPDATE PURCHASE LIMITS
POST /api/presale/purchase-limits
=========================================================
*/

export const purchaseLimits = async (
  req,
  res
) => {

  try {

    const result =
      await updateLimits(
        req.body
      );

    res.json(result);

  } catch (error) {

    console.error(error);

    res.status(500).json({

      success: false,

      error: error.message,

    });

  }

};

/*
=========================================================
WITHDRAW ETH
POST /api/presale/withdraw-eth
=========================================================
*/

export const withdraw = async (
  req,
  res
) => {

  try {

    const result =
      await withdrawPresaleETH();

    res.json(result);

  } catch (error) {

    console.error(error);

    res.status(500).json({

      success: false,

      error: error.message,

    });

  }

};