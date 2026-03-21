import express from "express";
import {
  submitVerification,
  getVerificationStatus
} from "./kyc.controller.js";

const router = express.Router();

router.post("/submit", submitVerification);

router.get("/status/:wallet", getVerificationStatus);

export default router;