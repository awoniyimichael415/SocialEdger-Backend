import { createPublicClient, http } from "viem";
import { sepolia } from "viem/chains";
import MembershipNFTABI from "../abi/MembershipNFT.json" with { type: "json" };

const client = createPublicClient({
  chain: sepolia,
  transport: http(process.env.SEPOLIA_RPC_URL),
});

const CONTRACT_ADDRESS = process.env.NFT_ADDRESS;

/*
=========================================================
CHECK DAO ELIGIBILITY
Reusable helper for services and middleware
=========================================================
*/

export const isEligibleForDAO = async (wallet) => {
  if (!wallet) {
    return false;
  }

  try {
    return await client.readContract({
      address: CONTRACT_ADDRESS,
      abi: MembershipNFTABI.abi,
      functionName: "isEligibleForDAO",
      args: [wallet],
    });
  } catch (error) {
    console.error("DAO eligibility check failed:", error);
    return false;
  }
};

/*
=========================================================
DAO ACCESS MIDDLEWARE
=========================================================
*/

export const requireDAOAccess = async (
  req,
  res,
  next
) => {
  try {
    const { wallet } = req.body;

    if (!wallet) {
      return res.status(400).json({
        success: false,
        message: "Wallet address is required.",
      });
    }

    const eligible = await isEligibleForDAO(wallet);

    if (!eligible) {
      return res.status(403).json({
        success: false,
        message:
          "Premium Membership is required to access DAO Governance.",
      });
    }

    req.wallet = wallet.toLowerCase();

    next();
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message:
        "Unable to verify DAO membership.",
    });
  }
};