/*
==================================================
SOCIALEDGER REWARD RULES
==================================================

All platform rewards are defined here.

The reward engine consumes these rules.

Changing reward values later only requires
editing this file.

==================================================
*/

export const RewardRules = {

  /*
  ==========================================
  OPPORTUNITIES
  ==========================================
  */

  opportunity: {

    beginner: {
      hive: 100,
      set: 10,
      daoCrat: 2,
      reputation: 25,
    },

    intermediate: {
      hive: 300,
      set: 30,
      daoCrat: 5,
      reputation: 50,
    },

    advanced: {
      hive: 600,
      set: 60,
      daoCrat: 10,
      reputation: 100,
    },

    enterprise: {
      hive: 1200,
      set: 120,
      daoCrat: 20,
      reputation: 180,
    },

  },

  /*
  ==========================================
  DAILY ACTIVITY
  ==========================================
  */

  dailyLogin: {

    hive: 5,
    reputation: 2,

  },

  /*
  ==========================================
  PROFILE
  ==========================================
  */

  profileCompleted: {

    hive: 50,
    reputation: 20,

  },

  /*
  ==========================================
  REFERRALS
  ==========================================
  */

  referral: {

    hive: 200,
    set: 20,
    daoCrat: 5,
    reputation: 40,

  },

  /*
  ==========================================
  COMMUNITY
  ==========================================
  */

  communityContribution: {

    hive: 80,
    reputation: 15,

  },

  /*
  ==========================================
  MINING
  ==========================================
  */

  mining: {

    hourly: {

      primary: 20,
      secondary: 10,
      contributor: 5,

    },

  },

  /*
  ==========================================
  PREMIUM BONUS
  ==========================================
  */

  membershipBonus: {

    primaryMultiplier: 1.5,

    secondaryMultiplier: 1.2,

    contributorMultiplier: 1.0,

  },

};