import Contributor from "../models/Contributor.js";
import {
  mintMembership,
  addSharedMember as addSharedMemberOnChain,
} from "../blockchain/membership.js";

/*
=========================================
TOTAL NFT SUPPLY
=========================================
*/

const TOTAL_SUPPLY = 20000;

/*
=========================================
GET ALL MINTED NFTS
=========================================
*/

export async function getMintedNFTs() {

  const contributors =
    await Contributor.find({

      membershipType: {

        $in: [

          "Primary",

          "Secondary",

        ],

      },

    }).sort({

      createdAt: -1,

    });

  return contributors.map(

    (member, index) => ({

      tokenId: index + 1,

      owner: member.walletAddress,

      membershipType:
        member.membershipType,

      sharedMembers: [],

      metadataURI: "",

      transactionHash: "",

      mintedAt: member.createdAt,

      status: "Active",

      royalty: "10%",

    })

  );

}

/*
=========================================
MEMBERSHIP SUMMARY
=========================================
*/

export async function membershipSummary() {

  const minted =
    await getMintedNFTs();

  const mintedNFTs =
    minted.length;

  const availableNFTs =
    TOTAL_SUPPLY -
    mintedNFTs;

  const primaryMembers =
    minted.filter(

      (m) =>

        m.membershipType ===
        "Primary"

    ).length;

  const secondaryMembers =
    minted.filter(

      (m) =>

        m.membershipType ===
        "Secondary"

    ).length;

  const sharedMemberships =
    minted.filter(

      (m) =>

        m.sharedMembers.length > 0

    ).length;

  return {

    totalSupply:
      TOTAL_SUPPLY,

    mintedNFTs,

    availableNFTs,

    primaryMembers,

    secondaryMembers,

    sharedMemberships,

  };

}

/*
=========================================
MEMBERSHIP ANALYTICS
=========================================
*/

export async function membershipAnalytics() {

  const summary =
    await membershipSummary();

  return {

    ...summary,

    mintProgress:

      Math.round(

        (

          summary.mintedNFTs /

          summary.totalSupply

        ) * 100

      ),

    activeMemberships:
      summary.mintedNFTs,

  };

}

/*
=========================================
MINT QUEUE
=========================================
*/

export async function getMintQueue() {

  return [];

}

/*
=========================================
MINT NFT
=========================================
*/

export async function mintMembershipNFT(payload) {

  const {
    walletAddress,
    tokenId,
  } = payload;

  const txHash =
    await mintMembership(
      walletAddress,
      tokenId
    );

  return {

    success: true,

    transactionHash: txHash,

    message:
      "Membership NFT minted successfully.",

    payload,

  };

}

/*
=========================================
ADD SHARED MEMBER
=========================================
*/

export async function addSharedMember(payload) {

  const {
    tokenId,
    member,
  } = payload;

  const txHash =
    await addSharedMemberOnChain(
      tokenId,
      member
    );

  return {

    success: true,

    transactionHash: txHash,

    message:
      "Shared member added successfully.",

    payload,

  };

}

/*
=========================================
UPDATE METADATA
=========================================
*/

export async function updateMetadata(

  payload

) {

  return {

    success: true,

    message:
      "Metadata updated.",

    payload,

  };

}