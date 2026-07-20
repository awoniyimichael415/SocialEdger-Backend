/*
=========================================================
SocialEdger Membership Blockchain Service
=========================================================
*/

import {
  publicClient,
  walletClient,
  ownerAddress,
} from "./provider.js";

import {
  MEMBERSHIP_CONTRACT,
} from "./config.js";

import MembershipNFTABI
  from "../abi/MembershipNFT.json"
  with { type: "json" };

/*
=========================================================
MINT MEMBERSHIP NFT
=========================================================
*/

export async function mintMembership(

  to,

  tokenId

) {

  const hash =
    await walletClient.writeContract({

      address: MEMBERSHIP_CONTRACT,

      abi: MembershipNFTABI.abi,

      functionName: "ownerMint",

      account: ownerAddress(),

      args: [

        to,

        BigInt(tokenId),

      ],

    });

  return hash;

}

/*
=========================================================
ADD SHARED MEMBER
=========================================================
*/

export async function addSharedMember(

  tokenId,

  member

) {

  const hash =
    await walletClient.writeContract({

      address: MEMBERSHIP_CONTRACT,

      abi: MembershipNFTABI.abi,

      functionName:
        "addSharedMember",

      account: ownerAddress(),

      args: [

        BigInt(tokenId),

        member,

      ],

    });

  return hash;

}

/*
=========================================================
REMOVE SHARED MEMBER
=========================================================
*/

export async function removeSharedMember(

  tokenId,

  member

) {

  const hash =
    await walletClient.writeContract({

      address: MEMBERSHIP_CONTRACT,

      abi: MembershipNFTABI.abi,

      functionName:
        "removeSharedMember",

      account: ownerAddress(),

      args: [

        BigInt(tokenId),

        member,

      ],

    });

  return hash;

}

/*
=========================================================
LOCK MEMBERSHIP
=========================================================
*/

export async function lockMembership(

  tokenId

) {

  const hash =
    await walletClient.writeContract({

      address: MEMBERSHIP_CONTRACT,

      abi: MembershipNFTABI.abi,

      functionName:
        "lockMembership",

      account: ownerAddress(),

      args: [

        BigInt(tokenId),

      ],

    });

  return hash;

}

/*
=========================================================
UNLOCK MEMBERSHIP
=========================================================
*/

export async function unlockMembership(

  tokenId

) {

  const hash =
    await walletClient.writeContract({

      address: MEMBERSHIP_CONTRACT,

      abi: MembershipNFTABI.abi,

      functionName:
        "unlockMembership",

      account: ownerAddress(),

      args: [

        BigInt(tokenId),

      ],

    });

  return hash;

}

/*
=========================================================
READ MEMBERSHIP INFO
=========================================================
*/

export async function getMembership(

  tokenId

) {

  return await publicClient.readContract({

    address: MEMBERSHIP_CONTRACT,

    abi: MembershipNFTABI.abi,

    functionName:
      "getMembershipInfo",

    args: [

      BigInt(tokenId),

    ],

  });

}

/*
=========================================================
READ SHARED MEMBERS
=========================================================
*/

export async function getSharedMembers(

  tokenId

) {

  return await publicClient.readContract({

    address: MEMBERSHIP_CONTRACT,

    abi: MembershipNFTABI.abi,

    functionName:
      "getSharedMembers",

    args: [

      BigInt(tokenId),

    ],

  });

}