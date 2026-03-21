import express from "express";
import KYC from "./kyc.model.js";

const router = express.Router();

// GET ALL KYC
router.get("/", async (req, res) => {
  try {
    const records = await KYC.find().sort({ createdAt: -1 });

    res.json(records);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch KYC" });
  }
});

// UPDATE STATUS (APPROVE / REJECT)
router.put("/:id", async (req, res) => {
  try {
    const { status } = req.body;

    const updated = await KYC.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Update failed" });
  }
});

export default router;