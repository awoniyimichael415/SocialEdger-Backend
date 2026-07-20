/*
=========================================================
SocialEdger Presale Blockchain Service
=========================================================
*/

import {
  publicClient,
  walletClient,
  account,
} from "./provider.js";

import {
  PRESALE_CONTRACT,
} from "./config.js";

import PresaleABI
  from "../abi/Presale.json"
  with { type: "json" };

/*
=========================================================
CURRENT PHASE
=========================================================
*/

export async function currentPhase() {

  return await publicClient.readContract({

    address: PRESALE_CONTRACT,

    abi: PresaleABI.abi,

    functionName: "getCurrentPhase",

  });

}

/*
=========================================================
PRESALE SUMMARY
=========================================================
*/

export async function presaleSummary() {

  return await publicClient.readContract({

    address: PRESALE_CONTRACT,

    abi: PresaleABI.abi,

    functionName: "presaleSummary",

  });

}

/*
=========================================================
PARTICIPANT INFO
=========================================================
*/

export async function participantInfo(

  wallet

) {

  return await publicClient.readContract({

    address: PRESALE_CONTRACT,

    abi: PresaleABI.abi,

    functionName: "participantInfo",

    args: [

      wallet,

    ],

  });

}

/*
=========================================================
REMAINING TOKENS
=========================================================
*/

export async function remainingTokens() {

  return await publicClient.readContract({

    address: PRESALE_CONTRACT,

    abi: PresaleABI.abi,

    functionName: "remainingTokens",

  });

}

/*
=========================================================
CREATE PHASE
=========================================================
*/

export async function createPhase(

  phaseId,

  name,

  rate,

  startTime,

  endTime

) {

  return await walletClient.writeContract({

    account,

    address: PRESALE_CONTRACT,

    abi: PresaleABI.abi,

    functionName: "createPhase",

    args: [

      BigInt(phaseId),

      name,

      BigInt(rate),

      BigInt(startTime),

      BigInt(endTime),

    ],

  });

}

/*
=========================================================
ACTIVATE PHASE
=========================================================
*/

export async function activatePhase(

  phaseId

) {

  return await walletClient.writeContract({

    account,

    address: PRESALE_CONTRACT,

    abi: PresaleABI.abi,

    functionName: "activatePhase",

    args: [

      BigInt(phaseId),

    ],

  });

}

/*
=========================================================
UPDATE PURCHASE LIMITS
=========================================================
*/

export async function updatePurchaseLimits(

  minimum,

  maximum

) {

  return await walletClient.writeContract({

    account,

    address: PRESALE_CONTRACT,

    abi: PresaleABI.abi,

    functionName: "setPurchaseLimits",

    args: [

      BigInt(minimum),

      BigInt(maximum),

    ],

  });

}

/*
=========================================================
WITHDRAW ETH
=========================================================
*/

export async function withdrawETH() {

  return await walletClient.writeContract({

    account,

    address: PRESALE_CONTRACT,

    abi: PresaleABI.abi,

    functionName: "withdrawETH",

  });

}