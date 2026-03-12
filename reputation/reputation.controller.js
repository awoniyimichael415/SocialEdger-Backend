import { getReputationScore } from "./reputation.service.js";

export const reputation = async (req, res) => {
  try {
    const wallet = req.params.wallet;

    const score = await getReputationScore(wallet);

    res.json(score);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to calculate reputation" });
  }
};