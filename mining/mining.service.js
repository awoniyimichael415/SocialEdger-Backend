import { ethers } from "ethers";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import MiningSession from "./mining.model.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/*
Load Membership NFT ABI
*/
const membershipAbiPath = path.resolve(
  __dirname,
  "../../frontend/src/abi/MembershipNFT.json"
);

const membershipAbiFile = JSON.parse(
  fs.readFileSync(membershipAbiPath, "utf8")
);

const MEMBERSHIP_ABI = membershipAbiFile.abi;

/*
Load Token ABI
*/
const tokenAbiPath = path.resolve(
  __dirname,
  "../../frontend/src/abi/PresaleToken.json"
);

const tokenAbiFile = JSON.parse(
  fs.readFileSync(tokenAbiPath, "utf8")
);

const TOKEN_ABI = tokenAbiFile.abi;

/*
Provider
*/
const getProvider = () => {
  return new ethers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);
};

/*
Wallet
*/
const getWallet = () => {

  const key = process.env.SEPOLIA_PRIVATE_KEY;

  if (!key) {
    throw new Error("SEPOLIA_PRIVATE_KEY missing");
  }

  return new ethers.Wallet(key, getProvider());
};

/*
Contracts
*/
const getMembershipContract = () => {

  const address = process.env.NFT_ADDRESS;

  if (!address) {
    throw new Error("NFT_ADDRESS missing in .env");
  }

  return new ethers.Contract(
    address,
    MEMBERSHIP_ABI,
    getProvider()
  );

};

const getTokenContract = () => {

  const address = process.env.TOKEN_ADDRESS;

  if (!address) {
    throw new Error("TOKEN_ADDRESS missing in .env");
  }

  return new ethers.Contract(
    address,
    TOKEN_ABI,
    getWallet()
  );

};

/*
Mining rate
*/
const BASE_RATE = 1;

/*
Multiplier
*/
export const calculateMultiplier = async (walletAddress) => {

  const membershipContract = getMembershipContract();

  const isPrimary = await membershipContract.isPrimary(walletAddress);
  const isSecondary = await membershipContract.isSecondary(walletAddress);

  if (isPrimary) return 5;
  if (isSecondary) return 2;

  return 1;

};

/*
Start mining
*/
export const startMining = async (walletAddress) => {

  let session = await MiningSession.findOne({
    wallet: walletAddress
  });

  if (session) return session;

  const multiplier = await calculateMultiplier(walletAddress);

  session = new MiningSession({
    wallet: walletAddress,
    startedAt: new Date(),
    lastClaim: new Date(),
    multiplier,
    totalMined: 0
  });

  await session.save();

  return session;

};

/*
Calculate reward
*/
export const calculateReward = (session) => {

  const now = new Date();

  const hours =
    (now - session.lastClaim) / (1000 * 60 * 60);

  return hours * BASE_RATE * session.multiplier;

};

/*
Claim reward
*/
export const claimMiningReward = async (walletAddress) => {

  const tokenContract = getTokenContract();

  const session = await MiningSession.findOne({
    wallet: walletAddress
  });

  if (!session) {
    throw new Error("Mining not started");
  }

  const reward = calculateReward(session);

  if (reward <= 0) return 0;

  const amount = ethers.parseUnits(
    reward.toFixed(4),
    18
  );

  const tx = await tokenContract.transfer(
    walletAddress,
    amount
  );

  await tx.wait();

  session.totalMined += reward;
  session.lastClaim = new Date();

  await session.save();

  return reward;

};