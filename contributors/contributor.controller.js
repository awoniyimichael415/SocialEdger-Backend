import {

  getAllContributors,

  getContributor,

  verifyContributor,

  suspendContributor,

  activateContributor,

  resetReputation,

  contributorSummary,

  contributorAnalytics,

} from "./contributor.service.js";

/*
=========================================
GET ALL CONTRIBUTORS
GET /api/contributors
=========================================
*/

export const getContributors = async (
  req,
  res
) => {

  try {

    const contributors =
      await getAllContributors();

    res.json(contributors);

  } catch (error) {

    console.error(error);

    res.status(500).json({

      success: false,

      error: error.message,

    });

  }

};

/*
=========================================
GET CONTRIBUTOR
GET /api/contributors/:id
=========================================
*/

export const getContributorById = async (
  req,
  res
) => {

  try {

    const contributor =
      await getContributor(req.params.id);

    if (!contributor) {

      return res.status(404).json({

        success: false,

        error: "Contributor not found.",

      });

    }

    res.json(contributor);

  } catch (error) {

    console.error(error);

    res.status(500).json({

      success: false,

      error: error.message,

    });

  }

};

/*
=========================================
VERIFY CONTRIBUTOR
PUT /api/contributors/:id/verify
=========================================
*/

export const verify = async (
  req,
  res
) => {

  try {

    const contributor =
      await verifyContributor(req.params.id);

    res.json({

      success: true,

      contributor,

    });

  } catch (error) {

    console.error(error);

    res.status(500).json({

      success: false,

      error: error.message,

    });

  }

};

/*
=========================================
SUSPEND CONTRIBUTOR
PUT /api/contributors/:id/suspend
=========================================
*/

export const suspend = async (
  req,
  res
) => {

  try {

    const contributor =
      await suspendContributor(

        req.params.id,

        req.body.reason

      );

    res.json({

      success: true,

      contributor,

    });

  } catch (error) {

    console.error(error);

    res.status(500).json({

      success: false,

      error: error.message,

    });

  }

};

/*
=========================================
ACTIVATE CONTRIBUTOR
PUT /api/contributors/:id/activate
=========================================
*/

export const activate = async (
  req,
  res
) => {

  try {

    const contributor =
      await activateContributor(req.params.id);

    res.json({

      success: true,

      contributor,

    });

  } catch (error) {

    console.error(error);

    res.status(500).json({

      success: false,

      error: error.message,

    });

  }

};

/*
=========================================
RESET REPUTATION
PUT /api/contributors/:id/reset-reputation
=========================================
*/

export const reset = async (
  req,
  res
) => {

  try {

    const contributor =
      await resetReputation(req.params.id);

    res.json({

      success: true,

      contributor,

    });

  } catch (error) {

    console.error(error);

    res.status(500).json({

      success: false,

      error: error.message,

    });

  }

};

/*
=========================================
SUMMARY
GET /api/contributors/admin/summary
=========================================
*/

export const summary = async (
  req,
  res
) => {

  try {

    const data =
      await contributorSummary();

    res.json(data);

  } catch (error) {

    console.error(error);

    res.status(500).json({

      success: false,

      error: error.message,

    });

  }

};

/*
=========================================
ANALYTICS
GET /api/contributors/admin/analytics
=========================================
*/

export const analytics = async (
  req,
  res
) => {

  try {

    const data =
      await contributorAnalytics();

    res.json(data);

  } catch (error) {

    console.error(error);

    res.status(500).json({

      success: false,

      error: error.message,

    });

  }

};