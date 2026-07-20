/*
=========================================================
SocialEdger Token Blockchain Service
=========================================================
*/

import {
  publicClient,
  walletClient,
  account,
} from "./provider.js";

import {
  TOKEN_CONTRACT,
} from "./config.js";

import TokenABI
  from "../abi/PresaleToken.json"
  with { type: "json" };

/*
=========================================================
TOKEN INFORMATION
=========================================================
*/

export async function tokenInfo() {

  const name =
    await publicClient.readContract({
      address: TOKEN_CONTRACT,
      abi: TokenABI.abi,
      functionName: "name",
    });

  const symbol =
    await publicClient.readContract({
      address: TOKEN_CONTRACT,
      abi: TokenABI.abi,
      functionName: "symbol",
    });

  const decimals =
    await publicClient.readContract({
      address: TOKEN_CONTRACT,
      abi: TokenABI.abi,
      functionName: "decimals",
    });

  const supply =
    await publicClient.readContract({
      address: TOKEN_CONTRACT,
      abi: TokenABI.abi,
      functionName: "totalSupply",
    });

  return {

    name,

    symbol,

    decimals,

    totalSupply: supply,

  };

}

/*
=========================================================
TOKEN BALANCE
=========================================================
*/

export async function balanceOf(wallet) {

  return await publicClient.readContract({

    address: TOKEN_CONTRACT,

    abi: TokenABI.abi,

    functionName: "balanceOf",

    args: [wallet],

  });

}

/*
=========================================================
TRANSFER SET
=========================================================
*/

export async function transferSET(

  recipient,

  amount

) {

  return await walletClient.writeContract({

    account,

    address: TOKEN_CONTRACT,

    abi: TokenABI.abi,

    functionName: "transfer",

    args: [

      recipient,

      BigInt(amount),

    ],

  });

}

/*
=========================================================
FUND PRESALE
=========================================================
*/

export async function fundPresale(

  amount

) {

  return await walletClient.writeContract({

    account,

    address: TOKEN_CONTRACT,

    abi: TokenABI.abi,

    functionName: "fundPresale",

    args: [

      "0x967eEdb35704E692fe106b333c2d32479fbB11B7",

      BigInt(amount),

    ],

  });

}

/*
=========================================================
OWNER BALANCE
=========================================================
*/

export async function ownerBalance() {

  return balanceOf(account.address);

}