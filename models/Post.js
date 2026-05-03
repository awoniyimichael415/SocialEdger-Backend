import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true },
    content: { type: String, required: true },
    excerpt: String,
    coverImage: String,
    category: {
      type: String,
      enum: ["blog", "article", "resource"],
      default: "blog",
    },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Post", PostSchema);