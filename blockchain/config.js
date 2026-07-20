/*
=========================================================
SocialEdger Blockchain Configuration
=========================================================
*/

import dotenv from "dotenv";

dotenv.config();

/*
=========================================================
NETWORK
=========================================================
*/

export const RPC_URL =
  process.env.SEPOLIA_RPC_URL;

/*
=========================================================
PRIVATE KEY
=========================================================
*/

export const PRIVATE_KEY =
  process.env.SEPOLIA_PRIVATE_KEY;

/*
=========================================================
DEPLOYED CONTRACTS (SEPOLIA)
=========================================================
*/

export const MEMBERSHIP_CONTRACT =
  "0xd906Ca726EbaB12c6ad627d12d70F4c5a8807922";

export const TOKEN_CONTRACT =
  "0x0d81FF96550C692A77755B24C4a5bF86B6c9519A";

export const PRESALE_CONTRACT =
  "0x967eEdb35704E692fe106b333c2d32479fbB11B7";

/*
=========================================================
CHAIN
=========================================================
*/

export const CHAIN = "sepolia";