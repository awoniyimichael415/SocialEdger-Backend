export function calculateBadges(
  contributor,
  totalReputation
) {

  const badges = [];

  if (!contributor) {
    return badges;
  }

  /*
  =====================================
  MEMBERSHIP
  =====================================
  */

  if (
    contributor.membershipType === "Primary"
  ) {
    badges.push({
      name: "Genesis Member",
      icon: "💎",
      description:
        "Primary Membership NFT Holder",
    });
  }

  if (
    contributor.membershipType === "Premium"
  ) {
    badges.push({
      name: "Premium Member",
      icon: "⭐",
      description:
        "Premium Ecosystem Member",
    });
  }

  /*
  =====================================
  VERIFICATION
  =====================================
  */

  if (contributor.verified) {
    badges.push({
      name: "Verified",
      icon: "✔️",
      description:
        "Verified Contributor",
    });
  }

  /*
  =====================================
  REPUTATION
  =====================================
  */

  if (totalReputation >= 10000) {

    badges.push({
      name: "SocialEdger Legend",
      icon: "👑",
      description:
        "Reached 10,000 Reputation",
    });

  } else if (totalReputation >= 5000) {

    badges.push({
      name: "Elite Builder",
      icon: "🏆",
      description:
        "Elite Ecosystem Contributor",
    });

  } else if (totalReputation >= 2500) {

    badges.push({
      name: "Trusted Builder",
      icon: "🥇",
      description:
        "Highly Trusted Contributor",
    });

  } else if (totalReputation >= 1000) {

    badges.push({
      name: "Rising Contributor",
      icon: "🥈",
      description:
        "Growing Reputation",
    });

  }

  /*
  =====================================
  OPPORTUNITIES
  =====================================
  */

  const completed =
    contributor.totalCompleted || 0;

  if (completed >= 50) {

    badges.push({
      name: "Opportunity Master",
      icon: "🚀",
      description:
        "Completed 50 Opportunities",
    });

  } else if (completed >= 20) {

    badges.push({
      name: "Experienced Contributor",
      icon: "🎯",
      description:
        "Completed 20 Opportunities",
    });

  } else if (completed >= 5) {

    badges.push({
      name: "Active Contributor",
      icon: "⚡",
      description:
        "Completed 5 Opportunities",
    });

  }

  /*
  =====================================
  COMMUNITY
  =====================================
  */

  if (
    contributor.endorsements >= 25
  ) {

    badges.push({
      name: "Community Favorite",
      icon: "❤️",
      description:
        "Highly Endorsed by Community",
    });

  }

  if (
    contributor.followers >= 100
  ) {

    badges.push({
      name: "Community Influencer",
      icon: "🌍",
      description:
        "100+ Followers",
    });

  }

  /*
  =====================================
  REWARDS
  =====================================
  */

  const rewards =
    (contributor.totalHiveEarned || 0) +
    (contributor.totalSetEarned || 0) +
    (contributor.totalDaoCratEarned || 0);

  if (rewards >= 100000) {

    badges.push({
      name: "Top Earner",
      icon: "💰",
      description:
        "Exceptional Reward History",
    });

  }

  /*
  =====================================
  PROFILE
  =====================================
  */

  if (
    contributor.portfolioProjects &&
    contributor.portfolioProjects.length >= 10
  ) {

    badges.push({
      name: "Portfolio Master",
      icon: "📁",
      description:
        "Outstanding Project Portfolio",
    });

  }

  return badges;

}