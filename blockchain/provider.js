/*
=========================================================
SocialEdger Blockchain Provider
=========================================================
*/

import { createPublicClient, createWalletClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { sepolia } from "viem/chains";

import {
  RPC_URL,
  PRIVATE_KEY,
} from "./config.js";

/*
=========================================================
OWNER ACCOUNT
=========================================================
*/

export const account = privateKeyToAccount(
  PRIVATE_KEY
);

/*
=========================================================
PUBLIC CLIENT
(Read Blockchain)
=========================================================
*/

export const publicClient =
  createPublicClient({

    chain: sepolia,

    transport: http(RPC_URL),

  });

/*
=========================================================
WALLET CLIENT
(Write Blockchain)
=========================================================
*/

export const walletClient =
  createWalletClient({

    account,

    chain: sepolia,

    transport: http(RPC_URL),

  });

/*
=========================================================
NETWORK INFO
=========================================================
*/

export async function getChainId() {

  return await publicClient.getChainId();

}

/*
=========================================================
LATEST BLOCK
=========================================================
*/

export async function latestBlock() {

  return await publicClient.getBlockNumber();

}

/*
=========================================================
OWNER WALLET
=========================================================
*/

export function ownerAddress() {

  return account.address;

}