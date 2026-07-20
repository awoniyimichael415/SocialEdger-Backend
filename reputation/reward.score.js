export async function rewardScore(contributor) {

  let score = 0;

  const reasons = [];

  if (!contributor) {
    return {
      score,
      reasons,
    };
  }

  /*
  =====================================
  HIVE TOKENS
  =====================================
  */

  const hive =
    contributor.totalHiveEarned || 0;

  if (hive > 0) {

    const hiveRep =
      Math.floor(hive / 100);

    score += hiveRep;

    reasons.push({
      title: "HIVE Rewards",
      reputation: hiveRep,
    });

  }

  /*
  =====================================
  SET TOKENS
  =====================================
  */

  const set =
    contributor.totalSetEarned || 0;

  if (set > 0) {

    const setRep =
      Math.floor(set / 50);

    score += setRep;

    reasons.push({
      title: "SET Rewards",
      reputation: setRep,
    });

  }

  /*
  =====================================
  DAOCRAT TOKENS
  =====================================
  */

  const dao =
    contributor.totalDaoCratEarned || 0;

  if (dao > 0) {

    const daoRep =
      Math.floor(dao / 25);

    score += daoRep;

    reasons.push({
      title: "DAOCRAT Rewards",
      reputation: daoRep,
    });

  }

  /*
  =====================================
  TOTAL REWARD MILESTONES
  =====================================
  */

  const totalRewards =
    hive + set + dao;

  if (totalRewards >= 100000) {

    score += 500;

    reasons.push({
      title: "Legendary Earner",
      reputation: 500,
    });

  } else if (totalRewards >= 50000) {

    score += 250;

    reasons.push({
      title: "Elite Earner",
      reputation: 250,
    });

  } else if (totalRewards >= 10000) {

    score += 100;

    reasons.push({
      title: "Professional Earner",
      reputation: 100,
    });

  } else if (totalRewards >= 1000) {

    score += 40;

    reasons.push({
      title: "Active Earner",
      reputation: 40,
    });

  }

  /*
  =====================================
  CONSISTENT CONTRIBUTOR BONUS
  =====================================
  */

  if (
    contributor.totalCompleted >= 20 &&
    totalRewards >= 10000
  ) {

    score += 100;

    reasons.push({
      title: "Consistent Contributor",
      reputation: 100,
    });

  }

  /*
  =====================================
  NEVER NEGATIVE
  =====================================
  */

  if (score < 0) {
    score = 0;
  }

  return {

    score,

    reasons,

  };

}