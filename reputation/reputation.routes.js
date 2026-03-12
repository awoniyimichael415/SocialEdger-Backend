import express from "express";
import { reputation } from "./reputation.controller.js";

const router = express.Router();

router.get("/:wallet", reputation);

export default router;