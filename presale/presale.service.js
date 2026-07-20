/*
=========================================================
SocialEdger Presale Service
=========================================================
*/

import {
  currentPhase,
  presaleSummary,
  remainingTokens,
  participantInfo,
  createPhase,
  activatePhase,
  updatePurchaseLimits,
  withdrawETH,
} from "../blockchain/presale.js";

/*
=========================================================
GET CURRENT PHASE
=========================================================
*/

export async function getCurrentPhase() {

  return await currentPhase();

}

/*
=========================================================
GET PRESALE SUMMARY
=========================================================
*/

export async function getPresaleSummary() {

  return await presaleSummary();

}

/*
=========================================================
GET REMAINING TOKENS
=========================================================
*/

export async function getRemainingTokens() {

  return await remainingTokens();

}

/*
=========================================================
GET PARTICIPANT
=========================================================
*/

export async function getParticipant(wallet) {

  return await participantInfo(wallet);

}

/*
=========================================================
CREATE PHASE
=========================================================
*/

export async function createPresalePhase(payload) {

  const {

    phaseId,

    name,

    rate,

    startTime,

    endTime,

  } = payload;

  const txHash =
    await createPhase(

      phaseId,

      name,

      rate,

      startTime,

      endTime

    );

  return {

    success: true,

    transactionHash: txHash,

    message:
      "Presale phase created successfully.",

  };

}

/*
=========================================================
ACTIVATE PHASE
=========================================================
*/

export async function activatePresalePhase(

  phaseId

) {

  const txHash =
    await activatePhase(phaseId);

  return {

    success: true,

    transactionHash: txHash,

    message:
      "Presale phase activated.",

  };

}

/*
=========================================================
UPDATE LIMITS
=========================================================
*/

export async function updateLimits(payload) {

  const {

    minimum,

    maximum,

  } = payload;

  const txHash =
    await updatePurchaseLimits(

      minimum,

      maximum

    );

  return {

    success: true,

    transactionHash: txHash,

    message:
      "Purchase limits updated.",

  };

}

/*
=========================================================
WITHDRAW ETH
=========================================================
*/

export async function withdrawPresaleETH() {

  const txHash =
    await withdrawETH();

  return {

    success: true,

    transactionHash: txHash,

    message:
      "ETH withdrawn successfully.",

  };

}