import express from "express";
import Contributor from "../models/Contributor.js";

import {

  getContributors,

  getContributorById,

  verify,

  suspend,

  activate,

  reset,

  summary,

  analytics,

} from "./contributor.controller.js";

const router = express.Router();

/*
==================================================
CREATE CONTRIBUTOR
==================================================
*/

router.post("/", async (req, res) => {

  try {

    const existing =
      await Contributor.findOne({

        walletAddress:
          req.body.walletAddress,

      });

    if (existing) {

      return res.status(400).json({

        error:
          "Contributor already exists",

      });

    }

    const contributor =
      await Contributor.create(req.body);

    res.json(contributor);

  } catch (error) {

    res.status(500).json({

      error: error.message,

    });

  }

});

/*
==================================================
ADMIN
==================================================
*/

router.get(
  "/admin/summary",
  summary
);

router.get(
  "/admin/analytics",
  analytics
);

/*
==================================================
GET ALL CONTRIBUTORS
==================================================
*/

router.get(
  "/",
  getContributors
);

/*
==================================================
GET CONTRIBUTOR BY ID
==================================================
*/

router.get(
  "/id/:id",
  getContributorById
);

/*
==================================================
GET CONTRIBUTOR BY USERNAME
==================================================
*/

router.get(
  "/:username",
  async (req, res) => {

    try {

      const contributor =
        await Contributor.findOne({

          username:
            req.params.username,

        });

      res.json(contributor);

    } catch (error) {

      res.status(500).json({

        error: error.message,

      });

    }

  }
);

/*
==================================================
UPDATE CONTRIBUTOR
==================================================
*/

router.put(
  "/:wallet",
  async (req, res) => {

    try {

      const contributor =
        await Contributor.findOneAndUpdate(

          {

            walletAddress:
              req.params.wallet,

          },

          req.body,

          {

            new: true,

          }

        );

      res.json(contributor);

    } catch (error) {

      res.status(500).json({

        error: error.message,

      });

    }

  }
);

/*
==================================================
ADMIN ACTIONS
==================================================
*/

router.put(
  "/id/:id/verify",
  verify
);

router.put(
  "/id/:id/suspend",
  suspend
);

router.put(
  "/id/:id/activate",
  activate
);

router.put(
  "/id/:id/reset-reputation",
  reset
);

export default router;