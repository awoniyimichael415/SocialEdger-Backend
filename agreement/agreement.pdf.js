import PDFDocument from "pdfkit";

export const generateAgreementPDF = (data, res) => {

  const doc = new PDFDocument({
    margin: 50,
    size: "A4",
  });

  res.setHeader(
    "Content-Type",
    "application/pdf"
  );

  res.setHeader(
    "Content-Disposition",
    `attachment; filename=SocialEdger-INFTO-${data.wallet}.pdf`
  );

  doc.pipe(res);

  // ================= HEADER =================

  doc
    .fontSize(24)
    .font("Helvetica-Bold")
    .text(
      "INITIAL NON FUNGIBLE TOKEN OFFERING AGREEMENT",
      {
        align: "center",
      }
    );

  doc.moveDown(0.5);

  doc
    .fontSize(10)
    .font("Helvetica")
    .fillColor("gray")
    .text(
      "SocialEdger • Membership NFT • Cryptographically Executable",
      {
        align: "center",
      }
    );

  doc.fillColor("black");

  doc.moveDown(2);

  // ================= SUBJECT MATTER =================

  doc
    .font("Helvetica-Bold")
    .fontSize(16)
    .text("SUBJECT MATTER");

  doc.moveDown(0.5);

  doc
    .font("Helvetica")
    .fontSize(11)
    .text(`
The subject matter of this Agreement is Membership attached with an art NFTs. This Agreement grants the Member a Membership NFT that confers both ownership of unique digital artwork and full membership rights in the SocialEdger project and community. This document integrates all material clauses of the standard SAFE adapted for this Membership NFT offering and is structured for direct implementation as or reference by a blockchain smart contract.
`, {
      align: "justify",
      lineGap: 4,
    });

  // ================= BUYING PROCESS =================

  doc.moveDown();

  doc
    .font("Helvetica-Bold")
    .fontSize(16)
    .text("BUYING PROCESS SELECTION");

  doc.moveDown(0.5);

  doc
    .font("Helvetica")
    .fontSize(11)
    .text(`
□ SHARED MEMBERSHIP — The Membership NFT consists of two membership vaults. The Purchase Amount, all economic participation rights, utilities, and obligations are shared equally between two Members. Both parties must execute this Agreement and designate their respective Wallets.

□ SINGLE OWNED MEMBERSHIP — Only one Member purchases and owns the full Membership NFT. All rights and obligations under this Agreement belong exclusively to that single Member.
`, {
      align: "justify",
      lineGap: 4,
    });

  // ================= SECTION 1 =================

  doc.moveDown();

  doc
    .font("Helvetica-Bold")
    .fontSize(16)
    .text("1. EVENTS");

  doc.moveDown(0.5);

  const section1 = `
1.1 Membership Genesis Event (Equity Financing Equivalent).

If a Membership Genesis Event occurs before termination, this Agreement shall automatically convert into the right to receive Membership NFTs equal to the Purchase Amount divided by the Effective Price.

1.2 Liquidity / Exit Event.

If a Liquidity Event occurs before termination, the Member shall receive the greater of:

(i) the Purchase Amount (Cash-Out Amount), or
(ii) the value of Membership NFTs calculated under Section 1.1.

1.3 Dissolution Event.

If a Dissolution Event occurs before termination, the Member shall be entitled to receive the Purchase Amount or its pro-rata share of remaining distributable assets.

1.4 Priority and Anti-Dilution Protection.

The Member’s rights under this Agreement shall rank pari passu with all holders of substantially similar INFTO Agreements.
`;

  doc
    .font("Helvetica")
    .fontSize(11)
    .text(section1, {
      align: "justify",
      lineGap: 4,
    });

  // ================= SECTION 2 =================

  doc.moveDown();

  doc
    .font("Helvetica-Bold")
    .fontSize(16)
    .text("2. DEFINITIONS");

  doc.moveDown(0.5);

  const section2 = `
“Effective Price” means the lower of the Launch Price per Membership NFT or the price implied by the Post-Money Valuation Cap.

“Launch Price” means the price per Membership NFT at which NFTs are first offered.

“Liquidity Price” means the valuation paid in a Liquidity Event.

“Purchase Amount” means the amount paid by the Member(s) in supported cryptocurrency to SocialEdger.

“Member’s Wallet” means the blockchain address designated by the Member.

“Smart Contract” means the ERC-721 or ERC-1155 smart contract deployed by SocialEdger.
`;

  doc
    .font("Helvetica")
    .fontSize(11)
    .text(section2, {
      align: "justify",
      lineGap: 4,
    });

  // ================= SECTION 3 =================

  doc.moveDown();

  doc
    .font("Helvetica-Bold")
    .fontSize(16)
    .text("3. RIGHTS AND LIABILITIES OF SOCIALEDGER");

  doc.moveDown(0.5);

  const section3 = `
3.1 Rights of SocialEdger

(a) Right to receive and retain the Purchase Amount.

(b) Right to retain intellectual property rights, branding, and project assets.

(c) Right to update or upgrade the Smart Contract according to governance mechanisms.

(d) Right to enforce all terms of this Agreement.

(e) Right to receive 7% royalty fees on secondary NFT sales.

3.2 Liabilities of SocialEdger

(a) Obligation to mint and deliver Membership NFTs.

(b) Obligation to conduct independent smart contract audits.

(c) Obligation to provide quarterly project updates.

(d) Liability for material misrepresentation causing direct Member loss.
`;

  doc
    .font("Helvetica")
    .fontSize(11)
    .text(section3, {
      align: "justify",
      lineGap: 4,
    });

  // ================= PAGE BREAK =================

  doc.addPage();

  // ================= SECTION 4 =================

  doc
    .font("Helvetica-Bold")
    .fontSize(16)
    .text("4. RIGHTS AND LIABILITIES OF MEMBERS");

  doc.moveDown(0.5);

  const section4 = `
4.1 Rights of Members

(a) Irrevocable right to receive Membership NFTs.

(b) Ownership of unique digital artwork and membership rights.

(c) Collective economic participation in the SocialEdger ecosystem.

(d) Information and transparency rights.

(e) Transfer and liquidity rights.

(f) Event-driven protection rights.

4.2 Liabilities of Members

(a) Purchase Amount is non-refundable except where expressly stated.

(b) Seven Percent (7%) Artist Royalty Obligation applies permanently.

(c) No direct corporate shareholding rights are granted.

(d) Membership NFTs involve substantial financial and technological risk.

(e) Members are responsible for all tax and legal compliance.

(f) Members are solely responsible for wallet and private key security.

(g) Members agree to indemnify SocialEdger against damages arising from misuse or violations.
`;

  doc
    .font("Helvetica")
    .fontSize(11)
    .text(section4, {
      align: "justify",
      lineGap: 4,
    });

  // ================= SECTION 5 =================

  doc.moveDown();

  doc
    .font("Helvetica-Bold")
    .fontSize(16)
    .text("5. REPRESENTATIONS AND WARRANTIES");

  doc.moveDown(0.5);

  const section5 = `
5.1 SocialEdger represents that it has the legal authority to issue Membership NFTs and operate the ecosystem.

5.2 Members represent that they understand blockchain technology, digital asset risks, and applicable legal obligations.
`;

  doc
    .font("Helvetica")
    .fontSize(11)
    .text(section5, {
      align: "justify",
      lineGap: 4,
    });

  // ================= SECTION 6 =================

  doc.moveDown();

  doc
    .font("Helvetica-Bold")
    .fontSize(16)
    .text("6. SMART CONTRACT INTEGRATION");

  doc.moveDown(0.5);

  const section6 = `
The Smart Contract governs all on-chain operations, royalty distributions, NFT minting, transfers, and automated executions.

Cryptographic wallet signatures shall be legally binding and enforceable under applicable electronic signature laws including ESIGN, UETA, and eIDAS.
`;

  doc
    .font("Helvetica")
    .fontSize(11)
    .text(section6, {
      align: "justify",
      lineGap: 4,
    });

  // ================= SECTION 7 =================

  doc.moveDown();

  doc
    .font("Helvetica-Bold")
    .fontSize(16)
    .text("7. MISCELLANEOUS PROVISIONS");

  doc.moveDown(0.5);

  const section7 = `
This Agreement includes provisions relating to:

• Governing Law and Dispute Resolution
• Amendments and Waivers
• Notices
• Entire Agreement
• Severability
• Assignment
• Force Majeure

All blockchain records, wallet signatures, timestamps, and smart contract events shall constitute admissible evidence.
`;

  doc
    .font("Helvetica")
    .fontSize(11)
    .text(section7, {
      align: "justify",
      lineGap: 4,
    });

  // ================= PARTICIPANT INFO =================

  doc.moveDown(2);

  doc
    .font("Helvetica-Bold")
    .fontSize(16)
    .text("MEMBER PARTICIPATION DETAILS");

  doc.moveDown();

  doc
    .font("Helvetica")
    .fontSize(11)
    .text(`
Wallet Address:
${data.wallet}

Agreement Timestamp:
${data.createdAt}

Cryptographic Signature:
${data.signature}

Agreement Hash:
${data.signature.slice(0, 30)}...
`, {
      lineGap: 5,
    });

  // ================= SIGNATURE =================

  doc.moveDown(2);

  doc
    .font("Helvetica-Bold")
    .fontSize(14)
    .text("SOCIALEDGER AUTHORIZED SIGNATURE");

  doc.moveDown();

  doc.image(
    "public/signature.png",
    {
      width: 200,
      align: "left",
    }
  );

  doc.moveDown(2);

  doc
    .font("Helvetica")
    .fontSize(10)
    .fillColor("gray")
    .text(
      "This document was automatically generated by the SocialEdger INFTO Agreement System.",
      {
        align: "center",
      }
    );

  doc.fillColor("black");

  doc.end();
};
