import express from "express";
import OpportunityApplication from "../models/OpportunityApplication.js";
import Opportunity from "../models/Opportunity.js";

const router = express.Router();

/*
=========================================
CREATE APPLICATION
=========================================
*/
router.post("/", async (req, res) => {

  try {

    const {
      opportunityId,
      walletAddress,
      username,
      coverLetter,
      portfolioLinks,
    } = req.body;

    const existing =
      await OpportunityApplication.findOne({
        opportunityId,
        walletAddress,
      });

    if (existing) {

      return res.status(400).json({
        error:
          "You have already applied for this opportunity.",
      });

    }

    const application =
      await OpportunityApplication.create({

        opportunityId,

        walletAddress,

        username,

        coverLetter,

        portfolioLinks,

      });

    await Opportunity.findByIdAndUpdate(

      opportunityId,

      {

        $push: {

          applicants: {

            walletAddress,

            username,

          },

        },

      }

    );

    res.json(application);

  } catch (error) {

    res.status(500).json({
      error: error.message,
    });

  }

});

/*
=========================================
GET ALL APPLICATIONS
=========================================
*/
router.get("/", async (req, res) => {

  try {

    const applications =
      await OpportunityApplication.find()
      .sort({ createdAt: -1 });

    res.json(applications);

  } catch (error) {

    res.status(500).json({
      error: error.message,
    });

  }

});

/*
=========================================
GET APPLICATIONS BY OPPORTUNITY
=========================================
*/
router.get("/opportunity/:id", async (req, res) => {

  try {

    const applications =
      await OpportunityApplication.find({

        opportunityId:
          req.params.id,

      });

    res.json(applications);

  } catch (error) {

    res.status(500).json({
      error: error.message,
    });

  }

});

/*
=========================================
GET APPLICATIONS BY WALLET
=========================================
*/
router.get("/wallet/:wallet", async (req, res) => {

  try {

    const applications =
      await OpportunityApplication.find({

        walletAddress:
          req.params.wallet,

      });

    res.json(applications);

  } catch (error) {

    res.status(500).json({
      error: error.message,
    });

  }

});

/*
=========================================
UPDATE APPLICATION STATUS
=========================================
*/
router.put("/:id", async (req, res) => {

  try {

    const application =
      await OpportunityApplication.findByIdAndUpdate(

        req.params.id,

        req.body,

        {

          new: true,

        }

      );

    res.json(application);

  } catch (error) {

    res.status(500).json({
      error: error.message,
    });

  }

});

export default router;