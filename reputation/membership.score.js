import { ethers } from "ethers";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

/*
Current Directory
*/
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/*
Load Membership ABI
*/
const abi = JSON.parse(
  fs.readFileSync(
    path.resolve(
      __dirname,
      "../abi/MembershipNFT.json"
    ),
    "utf8"
  )
).abi;

/*
Blockchain
*/
const provider =
  new ethers.JsonRpcProvider(
    process.env.RPC_URL
  );

const contract =
  new ethers.Contract(
    "0xd906Ca726EbaB12c6ad627d12d70F4c5a8807922",
    abi,
    provider
  );

export async function membershipScore(wallet) {

  let score = 0;

  let role = "User";

  const reasons = [];

  try {

    const primary =
      await contract.isPrimary(wallet);

    const secondary =
      await contract.isSecondary(wallet);

    if (primary) {

      score += 100;

      role = "Primary Member";

      reasons.push({

        title: "Primary Membership",

        reputation: 100,

      });

    }

    if (secondary) {

      score += 50;

      role = "Secondary Member";

      reasons.push({

        title: "Secondary Membership",

        reputation: 50,

      });

    }

  } catch (err) {

    console.error(err);

  }

  return {

    score,

    role,

    reasons,

  };

}