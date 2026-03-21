import mongoose from "mongoose";

const agreementSchema = new mongoose.Schema({

  wallet: {
    type: String,
    required: true
  },

  signature: {
    type: String,
    required: true
  },

  message: {
    type: String,
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  }

});

export default mongoose.model("INFTOAgreement", agreementSchema);