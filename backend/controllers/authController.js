import User from "../model/user.model.js";
import zod from "zod";
import jwt from "jsonwebtoken";
import Account from "../model/account.model.js";
export const signupController = async (req, res) => {
  try {
    const signupSchema = zod.object({
      username: zod.string(),
      firstName: zod.string(),
      lastName: zod.string(),
      password: zod.string(),
    });

    const body = req.body;

    const { success } = signupSchema.safeParse(body);

    if (!success) {
      res.json({
        message: "email not valid/incorrect inputs",
      });
    }

    const emailExists = await User.findOne({ username: body.username });
    if (emailExists) {
      res.json({ message: "Email already exists/incorrect inputs" });
    }

    const user = await User.create({
      username: req.body.username,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    });

    const userId = user._id;

    await Account.create({
      userId,
      balance: 1 + Math.random() * 1000,
    });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.setHeader("Authorization", `Bearer ${token}`);

    return res.status(201).json({
      message: "New user created",
      user,
      token: token,
    });
  } catch (error) {
    console.log("error in signup controller");
    res.status(500).json({
      message: error.response.data.error,
    });
  }
};

export const signInController = async (req, res) => {
  try {
    const signInSchema = zod.object({
      username: zod.string(),
      password: zod.string(),
    });

    const body = req.body;

    const { success } = signInSchema.safeParse(body);

    if (!success) {
      res.json({
        message: "email not valid/incorrect inputs",
      });
    }

    const user = await User.findOne({
      username: body.username,
      password: body.password,
    });

    if (user) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
      res.setHeader("Authorization", `Bearer ${token}`);
      res.json({
        message: "login successful",
        token: token,
      });
    } else {
      return res.json("error while login");
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async () => {
  try {
    const updateUserSchema = zod.object({
      firstName: zod.string().optional(),
      lastName: zod.string().optional(),
      password: zod.string().optional(),
    });

    const body = req.body;

    const { success } = updateUserSchema.safeParse(body);

    if (!success) {
      res.status(413).json({
        message: "email not valid/incorrect inputs",
      });
    }

    const updateUser = await User.updateOne(req.body, {
      id: req.userId,
    });

    res.status(201).json({
      message: "user updated successfully",
      updateUser,
    });
  } catch (error) {
    console.log(error);
    res.status(403).json({
      message: "error in update user controller",
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const filter = req.query.filter || "";

    const users = User.find({
      $or: [
        {
          firstName: {
            $regex: filter,
          },
        },
        {
          lastName: {
            $regex: filter,
          },
        },
      ],
    });
    res.json({
      user: users.map((user) => ({
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        _id: user._id,
      })),
    });
  } catch (error) {
    console.log(error);
    res.status(403).json({
      message: "error in get all users controller",
    });
  }
};
