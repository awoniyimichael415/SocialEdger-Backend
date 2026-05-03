import express from "express";
import Post from "../models/Post.js";

const router = express.Router();

/**
 * CREATE POST (Protected)
 */
router.post("/", async (req, res) => {

  // 🔐 SIMPLE ADMIN SECURITY
  if (req.headers.authorization !== "Bearer ADMIN_SECRET") {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const post = await Post.create(req.body);
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * GET ALL POSTS
 */
router.get("/", async (req, res) => {
  try {
    const { category } = req.query;

    const posts = await Post.find(
      category ? { category } : {}
    ).sort({ createdAt: -1 });

    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * GET SINGLE POST
 */
router.get("/:slug", async (req, res) => {
  try {
    const post = await Post.findOne({
      slug: req.params.slug,
    });

    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;