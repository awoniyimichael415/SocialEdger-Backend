import Contributor from "../models/Contributor.js";

/*
=========================================
GET ALL CONTRIBUTORS
=========================================
*/

export async function getAllContributors() {

  return await Contributor.find().sort({

    createdAt: -1,

  });

}

/*
=========================================
GET CONTRIBUTOR
=========================================
*/

export async function getContributor(id) {

  return await Contributor.findById(id);

}

/*
=========================================
VERIFY CONTRIBUTOR
=========================================
*/

export async function verifyContributor(id) {

  return await Contributor.findByIdAndUpdate(

    id,

    {

      verified: true,

      verifiedAt: new Date(),

      accountStatus: "Active",

    },

    {

      new: true,

    }

  );

}

/*
=========================================
SUSPEND CONTRIBUTOR
=========================================
*/

export async function suspendContributor(

  id,

  reason = ""

) {

  return await Contributor.findByIdAndUpdate(

    id,

    {

      accountStatus: "Suspended",

      suspendedReason: reason,

      suspendedAt: new Date(),

    },

    {

      new: true,

    }

  );

}

/*
=========================================
ACTIVATE CONTRIBUTOR
=========================================
*/

export async function activateContributor(id) {

  return await Contributor.findByIdAndUpdate(

    id,

    {

      accountStatus: "Active",

      suspendedReason: "",

      suspendedAt: null,

    },

    {

      new: true,

    }

  );

}

/*
=========================================
RESET REPUTATION
=========================================
*/

export async function resetReputation(id) {

  return await Contributor.findByIdAndUpdate(

    id,

    {

      totalReputation: 0,

      contributorLevel: 1,

      daoVotingWeight: 0,

    },

    {

      new: true,

    }

  );

}

/*
=========================================
ADMIN SUMMARY
=========================================
*/

export async function contributorSummary() {

  const contributors =
    await Contributor.find();

  const totalContributors =
    contributors.length;

  const verifiedContributors =
    contributors.filter(

      (c) => c.verified

    ).length;

  const pendingVerification =
    contributors.filter(

      (c) =>

        !c.verified

    ).length;

  const suspendedContributors =
    contributors.filter(

      (c) =>

        c.accountStatus ===
        "Suspended"

    ).length;

  return {

    totalContributors,

    verifiedContributors,

    pendingVerification,

    suspendedContributors,

  };

}

/*
=========================================
ADMIN ANALYTICS
=========================================
*/

export async function contributorAnalytics() {

  const contributors =
    await Contributor.find();

  const totalContributors =
    contributors.length;

  const activeContributors =
    contributors.filter(

      (c) =>

        c.accountStatus ===
        "Active"

    ).length;

  const averageReputation =

    totalContributors === 0

      ? 0

      : Math.round(

          contributors.reduce(

            (sum, c) =>

              sum +

              c.totalReputation,

            0

          ) /

            totalContributors

        );

  return {

    totalContributors,

    activeContributors,

    averageReputation,

  };

}