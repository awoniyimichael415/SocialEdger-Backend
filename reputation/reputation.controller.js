import Contributor from "../models/Contributor.js";
import { getReputationScore } from "./reputation.service.js";

/*
=================================================
Single Contributor Reputation
=================================================
*/

export const reputation = async (req, res) => {
  try {
    const wallet = req.params.wallet;

    const score = await getReputationScore(wallet);

    res.json(score);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Failed to calculate reputation",
    });

  }
};

/*
=================================================
Admin Dashboard
=================================================
*/

export const adminDashboard = async (req, res) => {

  try {

    const contributors =
      await Contributor.find();

    let totalReputation = 0;

    let verified = 0;

    let premium = 0;

    let totalBadges = 0;

    let totalVotingWeight = 0;

    contributors.forEach((user) => {

      totalReputation +=
        user.totalReputation || 0;

      totalBadges +=
        user.badges?.length || 0;

      totalVotingWeight +=
        user.daoVotingWeight || 0;

      if (user.verified)
        verified++;

      if (
        user.membershipType === "Premium" ||
        user.membershipType === "Primary"
      ) {
        premium++;
      }

    });

    res.json({

      totalContributors:
        contributors.length,

      verifiedContributors:
        verified,

      premiumMembers:
        premium,

      totalReputation,

      averageReputation:
        contributors.length
          ? Math.round(
              totalReputation /
                contributors.length
            )
          : 0,

      totalBadges,

      totalVotingWeight,

    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Failed to load dashboard",
    });

  }

};

/*
=================================================
Leaderboard
=================================================
*/

export const leaderboard =
  async (req, res) => {

    try {

      const contributors =
        await Contributor.find()
          .sort({
            totalReputation: -1,
          })
          .limit(20);

      res.json(contributors);

    } catch (error) {

      console.error(error);

      res.status(500).json({
        error: "Failed to load leaderboard",
      });

    }

  };

/*
=================================================
All Contributors
=================================================
*/

export const contributors =
  async (req, res) => {

    try {

      const users =
        await Contributor.find().sort({
          totalReputation: -1,
        });

      res.json(users);

    } catch (error) {

      console.error(error);

      res.status(500).json({
        error: "Failed to load contributors",
      });

    }

  };