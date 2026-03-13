import { ethers } from "ethers";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

/*
Resolve current directory for ES modules
*/
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/*
Load ABI from backend folder
*/
const abiPath = path.resolve(
  __dirname,
  "../abi/MembershipNFT.json"
);

const abiFile = JSON.parse(
  fs.readFileSync(abiPath, "utf8")
);

const ABI = abiFile.abi;

/*
Use Sepolia RPC from environment variables
*/
const RPC = process.env.RPC_URL;

/*
Create provider
*/
const provider = new ethers.JsonRpcProvider(RPC);

/*
Membership NFT Contract Address
*/
const CONTRACT_ADDRESS = "0xe4353D2092B6bEbf7737227e405Ac7CcD3B212bD";

/*
Create contract instance
*/
const contract = new ethers.Contract(
  CONTRACT_ADDRESS,
  ABI,
  provider
);

export const getReputationScore = async (wallet) => {

  let score = 0;
  let role = "User";

  try {

    const isPrimary = await contract.isPrimary(wallet);
    const isSecondary = await contract.isSecondary(wallet);

    if (isPrimary) {
      score += 100;
      role = "Primary Member";
    }

    if (isSecondary) {
      score += 50;
      role = "Secondary Member";
    }

  } catch (error) {

    console.error("Blockchain read error:", error);

  }

  return {
    wallet,
    reputation: score,
    role,
  };
};