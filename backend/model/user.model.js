import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    required: true,
  },
  firstName: {
    type: String,
    trim: true,
    required: [true, "first Name is Required"],
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, "Last name is required"],
  },
  password: {
    type: String,
    minlength: 6,
    required: [true, ["password should be long than 6"]],
  },
});

const User = mongoose.model("User", userSchema);

export default User;
