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
      return res.json({
        message: "email not valid/incorrect inputs",
      });
    }

    const emailExists = await User.findOne({ username: body.username });
    if (emailExists) {
      return res.json({ message: "Email already exists/incorrect inputs" });
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
      return res.json({
        message: "email not valid/incorrect inputs",
      });
    }

    const emailExists = await User.findOne({
      username: body.username,
    });

    if (!emailExists) {
      return res.json({
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
