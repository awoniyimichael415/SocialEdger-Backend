import mongoose from "mongoose";

const kycSchema = new mongoose.Schema({

  wallet: {
    type: String,
    required: true,
    unique: true
  },

  idNumber: {
    type: String,
    required: true,
    unique: true
  },

  idType: {
    type: String,
    enum: [
      "passport",
      "national_id",
      "driver_license",
      "business_registration"
    ],
    required: true
  },

  verificationType: {
    type: String,
    enum: ["KYC", "KYB"],
    required: true
  },

  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending"
  },

  createdAt: {
    type: Date,
    default: Date.now
  }

});

export default mongoose.model("KYCVerification", kycSchema);