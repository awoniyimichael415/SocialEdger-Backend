import {

  getMintedNFTs,

  membershipSummary,

  membershipAnalytics,

  getMintQueue,

  mintMembershipNFT,

  addSharedMember,

  updateMetadata,

} from "./membership.service.js";

/*
=========================================
GET ALL MINTED NFTS
GET /api/membership/admin/nfts
=========================================
*/

export const getNFTs = async (
  req,
  res
) => {

  try {

    const nfts =
      await getMintedNFTs();

    res.json(nfts);

  } catch (error) {

    console.error(error);

    res.status(500).json({

      success: false,

      error: error.message,

    });

  }

};

/*
=========================================
MEMBERSHIP SUMMARY
GET /api/membership/admin/summary
=========================================
*/

export const summary = async (
  req,
  res
) => {

  try {

    const data =
      await membershipSummary();

    res.json(data);

  } catch (error) {

    console.error(error);

    res.status(500).json({

      success: false,

      error: error.message,

    });

  }

};

/*
=========================================
MEMBERSHIP ANALYTICS
GET /api/membership/admin/analytics
=========================================
*/

export const analytics = async (
  req,
  res
) => {

  try {

    const data =
      await membershipAnalytics();

    res.json(data);

  } catch (error) {

    console.error(error);

    res.status(500).json({

      success: false,

      error: error.message,

    });

  }

};

/*
=========================================
GET MINT QUEUE
GET /api/membership/admin/queue
=========================================
*/

export const queue = async (
  req,
  res
) => {

  try {

    const requests =
      await getMintQueue();

    res.json(requests);

  } catch (error) {

    console.error(error);

    res.status(500).json({

      success: false,

      error: error.message,

    });

  }

};

/*
=========================================
MINT MEMBERSHIP NFT
POST /api/membership/mint
=========================================
*/

export const mint = async (
  req,
  res
) => {

  try {

    const result =
      await mintMembershipNFT(
        req.body
      );

    res.json(result);

  } catch (error) {

    console.error(error);

    res.status(500).json({

      success: false,

      error: error.message,

    });

  }

};

/*
=========================================
ADD SHARED MEMBER
POST /api/membership/shared/add
=========================================
*/

export const addShared = async (
  req,
  res
) => {

  try {

    const result =
      await addSharedMember(
        req.body
      );

    res.json(result);

  } catch (error) {

    console.error(error);

    res.status(500).json({

      success: false,

      error: error.message,

    });

  }

};

/*
=========================================
UPDATE METADATA URI
POST /api/membership/metadata
=========================================
*/

export const metadata = async (
  req,
  res
) => {

  try {

    const result =
      await updateMetadata(
        req.body
      );

    res.json(result);

  } catch (error) {

    console.error(error);

    res.status(500).json({

      success: false,

      error: error.message,

    });

  }

};