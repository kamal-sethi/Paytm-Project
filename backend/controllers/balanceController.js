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

export const transferMoney = async () => {
  try {
    const session = mongoose.startSession();

    session.startTransaction();

    const { amount, To } = req.body;
    const account = await Account.findOne({ userId: req.userId }).session(
      session
    );

    if (!account || !account.balance < amount) {
      await session.abortTransaction();
      return res.status(400).json({
        message: "Insufficient Balance",
      });
    }

    const toAccount = await Account.findOne({ userId: To }.session());

    if (!toAccount) {
      await session.abortTransaction();
      return res.status(400).json({
        message: "Invalid Account",
      });
    }
    await Account.updateOne(
      { userId: req.userId },
      { $inc: { balance: -amount } }
    ).session(session);

    await Account.updateOne(
      { userId: To },
      { $inc: { balance: amount } }
    ).session(session);

    await session.commitTransaction();
    res.json({
      message: "Transfer successful",
    });
  } catch (error) {
    console.log("error in transfer money controller");
    res.status(403).json({
      message: "Error in transfer money controller",
    });
  }
};
