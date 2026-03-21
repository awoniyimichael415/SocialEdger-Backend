import KYC from "./kyc.model.js";

export const submitVerification = async (req, res) => {

  try {

    const { wallet, idNumber, idType, verificationType } = req.body;

    if (!wallet || !idNumber || !idType || !verificationType) {
      return res.status(400).json({
        error: "Missing required fields"
      });
    }

    const walletExists = await KYC.findOne({ wallet });

    if (walletExists) {
      return res.status(400).json({
        error: "This wallet has already submitted verification."
      });
    }

    const idExists = await KYC.findOne({ idNumber });

    if (idExists) {
      return res.status(400).json({
        error: "This ID number already exists."
      });
    }

    const record = new KYC({
      wallet,
      idNumber,
      idType,
      verificationType
    });

    await record.save();

    res.json({
      success: true,
      status: "pending"
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: "Server error"
    });

  }

};

export const getVerificationStatus = async (req, res) => {

  try {

    const { wallet } = req.params;

    const record = await KYC.findOne({ wallet });

    if (!record) {
      return res.json({
        status: "not_submitted"
      });
    }

    res.json({
      status: record.status
    });

  } catch (err) {

    res.status(500).json({
      error: "Server error"
    });

  }

};