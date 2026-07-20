import express from "express";
import Opportunity from "../models/Opportunity.js";

const router = express.Router();

/*
========================================
CREATE OPPORTUNITY
========================================
*/
router.post("/", async (req, res) => {
  try {

    const opportunity = await Opportunity.create(req.body);

    res.json(opportunity);

  } catch (error) {

    res.status(500).json({
      error: error.message,
    });

  }
});

/*
========================================
GET ALL OPPORTUNITIES
========================================
*/
router.get("/", async (req, res) => {

  try {

    const opportunities =
      await Opportunity.find().sort({
        createdAt: -1,
      });

    res.json(opportunities);

  } catch (error) {

    res.status(500).json({
      error: error.message,
    });

  }

});

/*
========================================
GET SINGLE OPPORTUNITY
========================================
*/
router.get("/:id", async (req, res) => {

  try {

    const opportunity =
      await Opportunity.findById(
        req.params.id
      );

    res.json(opportunity);

  } catch (error) {

    res.status(500).json({
      error: error.message,
    });

  }

});

/*
========================================
UPDATE OPPORTUNITY
========================================
*/
router.put("/:id", async (req, res) => {

  try {

    const opportunity =
      await Opportunity.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );

    res.json(opportunity);

  } catch (error) {

    res.status(500).json({
      error: error.message,
    });

  }

});

/*
========================================
DELETE OPPORTUNITY
========================================
*/
router.delete("/:id", async (req, res) => {

  try {

    await Opportunity.findByIdAndDelete(
      req.params.id
    );

    res.json({
      success: true,
    });

  } catch (error) {

    res.status(500).json({
      error: error.message,
    });

  }

});

/*
========================================
APPLY FOR OPPORTUNITY
========================================
*/
router.post("/:id/apply", async (req, res) => {

  try {

    const {
      walletAddress,
      username,
    } = req.body;

    const opportunity =
      await Opportunity.findById(
        req.params.id
      );

    if (!opportunity) {

      return res.status(404).json({
        error: "Opportunity not found",
      });

    }

    const alreadyApplied =
      opportunity.applicants.find(
        (applicant) =>
          applicant.walletAddress.toLowerCase() ===
          walletAddress.toLowerCase()
      );

    if (alreadyApplied) {

      return res.status(400).json({
        error:
          "You have already applied.",
      });

    }

    opportunity.applicants.push({
      walletAddress,
      username,
    });

    await opportunity.save();

    res.json(opportunity);

  } catch (error) {

    res.status(500).json({
      error: error.message,
    });

  }

});

export default router;