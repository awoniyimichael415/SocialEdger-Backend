import Agreement from "./agreement.model.js";
import { generateAgreementPDF } from "./agreement.pdf.js";

/*
SAVE SIGNED AGREEMENT
Wallet signs message → backend stores it
*/
export const saveAgreement = async (req, res) => {

  try {

    const { wallet, signature, message } = req.body;

    if (!wallet || !signature) {
      return res.status(400).json({
        error: "Missing required fields"
      });
    }

    const existing = await Agreement.findOne({ wallet });

    if (existing) {
      return res.json(existing);
    }

    const record = new Agreement({
      wallet,
      signature,
      message
    });

    await record.save();

    res.json(record);

  } catch (err) {

    console.error("Agreement save error:", err);

    res.status(500).json({
      error: "Failed to save agreement"
    });

  }

};


/*
CHECK IF USER SIGNED AGREEMENT
Used by Gallery page before mint
*/
export const checkAgreement = async (req, res) => {

  try {

    const { wallet } = req.params;

    const record = await Agreement.findOne({ wallet });

    if (!record) {

      return res.json({
        exists: false
      });

    }

    res.json({
      exists: true,
      signature: record.signature,
      timestamp: record.createdAt
    });

  } catch (err) {

    console.error("Agreement check error:", err);

    res.status(500).json({
      error: "Failed to check agreement"
    });

  }

};


/*
DOWNLOAD AGREEMENT PDF
Generates professional INFTO document
*/
export const downloadAgreement = async (req, res) => {

  try {

    const { wallet } = req.params;

    const record = await Agreement.findOne({ wallet });

    if (!record) {

      return res.status(404).json({
        error: "Agreement not found"
      });

    }

    generateAgreementPDF(record, res);

  } catch (err) {

    console.error("Agreement download error:", err);

    res.status(500).json({
      error: "Failed to generate agreement PDF"
    });

  }

};