import express from "express";
import multer from "multer";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("image"), async (req, res) => {
  try {
    console.log("FILE RECEIVED:", req.file);

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // 🔥 FORCE USE CONFIGURED INSTANCE
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "socialedger",
    });

    // cleanup temp file
    fs.unlinkSync(req.file.path);

    console.log("CLOUDINARY RESULT:", result.secure_url);

    res.json({ url: result.secure_url });

  } catch (err) {
    console.error("UPLOAD ERROR FULL:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;