import Account from "../model/account.model";

export const getBalance = async (req, res) => {
  try {
    const userId = req.userId;
    const account = await Account.findOne({ userId });

    return res.status(200).json({
      message: "balance fetched successfully",
      balance: Account.balance,
    });
  } catch (error) {
    return res.status(403).json({
      message: "error in get balance controller",
    });
  }
};
