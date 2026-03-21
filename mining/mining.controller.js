import {
  startMining,
  claimMiningReward
} from "./mining.service.js";

export const startMiningController = async (req, res) => {

  try {

    const { wallet } = req.body;

    const session = await startMining(wallet);

    res.json(session);

  } catch (err) {

    res.status(500).json({
      error: "Mining start failed"
    });

  }

};

export const claimRewardController = async (req, res) => {

  try {

    const { wallet } = req.body;

    const reward = await claimMiningReward(wallet);

    res.json({
      reward
    });

  } catch (err) {

    res.status(500).json({
      error: "Claim failed"
    });

  }

};