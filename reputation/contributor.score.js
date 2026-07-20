import Contributor from "../models/Contributor.js";

export async function contributorScore(wallet) {

  const contributor = await Contributor.findOne({
    walletAddress: wallet,
  });

  if (!contributor) {

    return {

      score: 0,

      contributor: null,

      reasons: [],

    };

  }

  let score = 0;

  const reasons = [];

  /*
  =====================================
  VERIFIED CONTRIBUTOR
  =====================================
  */

  if (contributor.verified) {

    score += 50;

    reasons.push({
      title: "Verified Contributor",
      reputation: 50,
    });

  }

  /*
  =====================================
  PROFILE COMPLETION
  =====================================
  */

  let completed = 0;

  const fields = [

    contributor.displayName,

    contributor.username,

    contributor.bio,

    contributor.country,

    contributor.category,

    contributor.website,

    contributor.linkedin,

    contributor.twitter,

    contributor.profileImage,

  ];

  fields.forEach((field) => {

    if (
      field &&
      field.toString().trim() !== ""
    ) {
      completed++;
    }

  });

  if (
    contributor.skills &&
    contributor.skills.length > 0
  ) {
    completed++;
  }

  if (
    contributor.portfolioLinks &&
    contributor.portfolioLinks.length > 0
  ) {
    completed++;
  }

  const completion =
    Math.round((completed / 11) * 100);

  if (completion >= 100) {

    score += 20;

    reasons.push({

      title: "Completed Profile",

      reputation: 20,

    });

  }

  /*
  =====================================
  COMPLETED OPPORTUNITIES
  =====================================
  */

  if (contributor.totalCompleted) {

    const rep =
      contributor.totalCompleted * 40;

    score += rep;

    reasons.push({

      title: "Completed Opportunities",

      reputation: rep,

    });

  }

  /*
  =====================================
  ACTIVE OPPORTUNITIES
  =====================================
  */

  if (
    contributor.activeOpportunities
  ) {

    const rep =
      contributor.activeOpportunities.length * 5;

    score += rep;

    reasons.push({

      title: "Active Opportunities",

      reputation: rep,

    });

  }

  /*
  =====================================
  ENDORSEMENTS
  =====================================
  */

  if (contributor.endorsements) {

    const rep =
      contributor.endorsements * 5;

    score += rep;

    reasons.push({

      title: "Community Endorsements",

      reputation: rep,

    });

  }

  /*
  =====================================
  FOLLOWERS
  =====================================
  */

  if (contributor.followers) {

    const rep =
      Math.floor(
        contributor.followers / 20
      );

    score += rep;

    reasons.push({

      title: "Followers",

      reputation: rep,

    });

  }

  /*
  =====================================
  BADGES
  =====================================
  */

  if (
    contributor.badges &&
    contributor.badges.length
  ) {

    const rep =
      contributor.badges.length * 15;

    score += rep;

    reasons.push({

      title: "Badges",

      reputation: rep,

    });

  }

  /*
  =====================================
  ACHIEVEMENTS
  =====================================
  */

  if (
    contributor.achievements &&
    contributor.achievements.length
  ) {

    const rep =
      contributor.achievements.length * 20;

    score += rep;

    reasons.push({

      title: "Achievements",

      reputation: rep,

    });

  }

  /*
  =====================================
  REWARD BONUS
  =====================================
  */

  const hive =
    contributor.totalHiveEarned || 0;

  const rewardBonus =
    Math.floor(hive / 100);

  score += rewardBonus;

  if (rewardBonus > 0) {

    reasons.push({

      title: "Reward History",

      reputation: rewardBonus,

    });

  }

  return {

    score,

    contributor,

    profileCompletion: completion,

    reasons,

  };

}