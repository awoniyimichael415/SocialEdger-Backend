import express from "express";

import {
  saveAgreement,
  checkAgreement,
  downloadAgreement
} from "./agreement.controller.js";

const router = express.Router();

/*
SIGN AGREEMENT
*/
router.post("/sign", saveAgreement);

/*
CHECK AGREEMENT
*/
router.get("/check/:wallet", checkAgreement);

/*
DOWNLOAD AGREEMENT PDF
*/
router.get("/download/:wallet", downloadAgreement);

export default router;