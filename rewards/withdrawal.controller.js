import {
  createWithdrawalRequest,
  getUserWithdrawals,
  getAllWithdrawals,
  approveWithdrawal,
  rejectWithdrawal,
} from "./withdrawal.service.js";

/*
=========================================
CREATE WITHDRAWAL REQUEST
POST /api/rewards/withdrawals
=========================================
*/

export const requestWithdrawal = async (
  req,
  res
) => {

  try {

    const withdrawal =
      await createWithdrawalRequest(
        req.body
      );

    res.status(201).json({
      success: true,
      withdrawal,
    });

  } catch (error) {

    console.error(error);

    res.status(400).json({
      success: false,
      error: error.message,
    });

  }

};

/*
=========================================
GET USER WITHDRAWALS
GET /api/rewards/withdrawals/:wallet
=========================================
*/

export const userWithdrawals = async (
  req,
  res
) => {

  try {

    const withdrawals =
      await getUserWithdrawals(
        req.params.wallet
      );

    res.json(withdrawals);

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
GET ALL WITHDRAWALS
(Admin)
GET /api/rewards/admin/withdrawals
=========================================
*/

export const adminWithdrawals =
  async (req, res) => {

    try {

      const withdrawals =
        await getAllWithdrawals();

      res.json(withdrawals);

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
APPROVE WITHDRAWAL
(Admin)
PUT /api/rewards/withdrawals/:id/approve
=========================================
*/

export const approve = async (
  req,
  res
) => {

  try {

    const request =
      await approveWithdrawal(

        req.params.id,

        req.body.admin || "Admin"

      );

    res.json({
      success: true,
      request,
    });

  } catch (error) {

    console.error(error);

    res.status(400).json({
      success: false,
      error: error.message,
    });

  }

};

/*
=========================================
REJECT WITHDRAWAL
(Admin)
PUT /api/rewards/withdrawals/:id/reject
=========================================
*/

export const reject = async (
  req,
  res
) => {

  try {

    const request =
      await rejectWithdrawal(

        req.params.id,

        req.body.admin || "Admin",

        req.body.note || ""

      );

    res.json({
      success: true,
      request,
    });

  } catch (error) {

    console.error(error);

    res.status(400).json({
      success: false,
      error: error.message,
    });

  }

};