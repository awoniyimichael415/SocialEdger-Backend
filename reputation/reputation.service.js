import { membershipScore } from "./membership.score.js";
import { contributorScore } from "./contributor.score.js";
import { opportunityScore } from "./opportunity.score.js";
import { rewardScore } from "./reward.score.js";
import { calculateLevel } from "./level.service.js";
import { calculateBadges } from "./badge.service.js";
import { buildReputationHistory } from "./history.service.js";

export async function getReputationScore(wallet) {

  /*
  =====================================
  MEMBERSHIP
  =====================================
  */

  const membership =
    await membershipScore(wallet);

  /*
  =====================================
  CONTRIBUTOR
  =====================================
  */

  const contributor =
    await contributorScore(wallet);

  /*
  =====================================
  OPPORTUNITIES
  =====================================
  */

  const opportunities =
    await opportunityScore(
      contributor.contributor
    );

  /*
  =====================================
  REWARDS
  =====================================
  */

  const rewards =
    await rewardScore(
      contributor.contributor
    );

  /*
  =====================================
  TOTAL REPUTATION
  =====================================
  */

  const totalReputation =
    membership.score +
    contributor.score +
    opportunities.score +
    rewards.score;

  /*
  =====================================
  LEVEL
  =====================================
  */

  const level =
    calculateLevel(totalReputation);

  /*
  =====================================
  BADGES
  =====================================
  */

  const badges =
    calculateBadges(
      contributor.contributor,
      totalReputation
    );

  /*
  =====================================
  HISTORY
  =====================================
  */

  const history =
    buildReputationHistory(
      membership,
      contributor,
      opportunities,
      rewards
    );

  /*
  =====================================
  UPDATE CONTRIBUTOR CACHE
  =====================================
  */

  if (contributor.contributor) {

    contributor.contributor.totalReputation =
      totalReputation;

    contributor.contributor.contributorLevel =
      level.level;

    contributor.contributor.badges =
      badges.map(
        (badge) => badge.name
      );

    contributor.contributor.daoVotingWeight =
      Math.max(
        1,
        Math.floor(
          totalReputation / 100
        )
      );

    await contributor.contributor.save();

  }

  /*
  =====================================
  RESPONSE
  =====================================
  */

  return {

    wallet,

    role: membership.role,

    membership,

    totalReputation,

    level,

    badges,

    history,

    contributor:
      contributor.contributor,

    profileCompletion:
      contributor.profileCompletion,

    daoVotingWeight:
      contributor.contributor
        ?.daoVotingWeight || 1,

    breakdown: {

      membership:
        membership.score,

      contributor:
        contributor.score,

      opportunities:
        opportunities.score,

      rewards:
        rewards.score,

    },

  };

}