export async function opportunityScore(contributor) {

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
  COMPLETED OPPORTUNITIES
  =====================================
  */

  const completed =
    contributor.totalCompleted || 0;

  score += completed * 25;

  if (completed > 0) {

    reasons.push({
      title: "Completed Opportunities",
      reputation: completed * 25,
    });

  }

  /*
  =====================================
  APPROVED APPLICATIONS
  =====================================
  */

  const approved =
    contributor.totalApproved || 0;

  score += approved * 10;

  if (approved > 0) {

    reasons.push({
      title: "Approved Applications",
      reputation: approved * 10,
    });

  }

  /*
  =====================================
  APPLICATION SUCCESS RATE
  =====================================
  */

  const applied =
    contributor.totalApplications || 0;

  if (applied > 0) {

    const rate =
      (approved / applied) * 100;

    if (rate >= 90) {

      score += 50;

      reasons.push({
        title: "Excellent Success Rate",
        reputation: 50,
      });

    } else if (rate >= 75) {

      score += 30;

      reasons.push({
        title: "High Success Rate",
        reputation: 30,
      });

    } else if (rate >= 60) {

      score += 15;

      reasons.push({
        title: "Good Success Rate",
        reputation: 15,
      });

    }

  }

  /*
  =====================================
  ACTIVE OPPORTUNITIES
  =====================================
  */

  const active =
    contributor.activeOpportunities?.length || 0;

  score += active * 5;

  if (active > 0) {

    reasons.push({
      title: "Active Opportunities",
      reputation: active * 5,
    });

  }

  /*
  =====================================
  PERFECT COMPLETION BONUS
  =====================================
  */

  if (
    completed >= 10 &&
    contributor.totalRejected === 0
  ) {

    score += 100;

    reasons.push({
      title: "Perfect Delivery Record",
      reputation: 100,
    });

  }

  /*
  =====================================
  CONSISTENCY BONUS
  =====================================
  */

  if (completed >= 25) {

    score += 150;

    reasons.push({
      title: "Elite Contributor",
      reputation: 150,
    });

  } else if (completed >= 15) {

    score += 75;

    reasons.push({
      title: "Senior Contributor",
      reputation: 75,
    });

  } else if (completed >= 5) {

    score += 30;

    reasons.push({
      title: "Growing Contributor",
      reputation: 30,
    });

  }

  /*
  =====================================
  REJECTION PENALTY
  =====================================
  */

  const rejected =
    contributor.totalRejected || 0;

  if (rejected > 0) {

    const penalty = rejected * 10;

    score -= penalty;

    reasons.push({
      title: "Rejected Opportunities",
      reputation: -penalty,
    });

  }

  /*
  =====================================
  NEVER RETURN NEGATIVE SCORE
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