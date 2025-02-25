import User from "../model/user.model";
import zod from "zod";
import jwt from "jsonwebtoken";
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

    const user = await User.create(body);
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

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

export const signController = async () => {
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

    const emailExists = await User.findOne({
      username: body.username,
    });

    if (!emailExists) {
      res.json({
        message: "Invalid email/incorrect inputs",
      });
    }

    const passwordMatched = emailExists.password === body.password;
    if (!passwordMatched) {
      return res.json({
        message: "Invalid email/incorrect inputs",
      });
    }

    res.status(201).json({
      message: "Login Successfully",
    });
  } catch (error) {}
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
