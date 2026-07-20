const LEVELS = [
  {
    level: 1,
    title: "New Contributor",
    minimum: 0,
    next: 250,
  },
  {
    level: 2,
    title: "Rising Contributor",
    minimum: 250,
    next: 600,
  },
  {
    level: 3,
    title: "Trusted Contributor",
    minimum: 600,
    next: 1200,
  },
  {
    level: 4,
    title: "Professional Contributor",
    minimum: 1200,
    next: 2000,
  },
  {
    level: 5,
    title: "Senior Contributor",
    minimum: 2000,
    next: 3000,
  },
  {
    level: 6,
    title: "Elite Builder",
    minimum: 3000,
    next: 4500,
  },
  {
    level: 7,
    title: "Ecosystem Leader",
    minimum: 4500,
    next: 6000,
  },
  {
    level: 8,
    title: "Community Champion",
    minimum: 6000,
    next: 8000,
  },
  {
    level: 9,
    title: "DAO Guardian",
    minimum: 8000,
    next: 10000,
  },
  {
    level: 10,
    title: "SocialEdger Legend",
    minimum: 10000,
    next: null,
  },
];

export function calculateLevel(totalReputation) {

  let current =
    LEVELS[0];

  for (const level of LEVELS) {

    if (
      totalReputation >= level.minimum
    ) {
      current = level;
    }

  }

  let progress = 100;

  let remaining = 0;

  if (current.next !== null) {

    const completed =
      totalReputation -
      current.minimum;

    const total =
      current.next -
      current.minimum;

    progress = Math.min(
      100,
      Math.round(
        (completed / total) * 100
      )
    );

    remaining =
      current.next -
      totalReputation;

  }

  return {

    level: current.level,

    title: current.title,

    reputation: totalReputation,

    progress,

    currentLevelMinimum:
      current.minimum,

    nextLevel:
      current.next,

    reputationRemaining:
      remaining,

    maxLevel:
      current.next === null,

  };

}