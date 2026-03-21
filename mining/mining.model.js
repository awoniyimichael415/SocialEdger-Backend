import mongoose from "mongoose";

const miningSchema = new mongoose.Schema({

  wallet: {
    type: String,
    required: true,
    unique: true
  },

  startedAt: {
    type: Date
  },

  lastClaim: {
    type: Date
  },

  multiplier: {
    type: Number,
    default: 1
  },

  totalMined: {
    type: Number,
    default: 0
  }

});

export default mongoose.model("MiningSession", miningSchema);