import bcrypt from "bcrypt";
import User from "../models/User.js";

export const loginOrSignup = async (req, res) => {
  const { username, password } = req.body;

  let user = await User.findOne({ username });

  // 🔹 User does NOT exist → SIGN UP
  if (!user) {
    const hashedPassword = await bcrypt.hash(password, 12);

    user = await User.create({
      username,
      password: hashedPassword,
    });

    return res.json({
      status: "signup",
      message: "Account created successfully",
      userId: user._id,
    });
  }

  // 🔹 User exists → LOGIN
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  res.json({
    status: "login",
    message: "Login successful",
    userId: user._id,
  });
};
