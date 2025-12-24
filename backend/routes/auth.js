import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // 1. Check user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 2. Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 3. Create token (optional but recommended)
    const token = jwt.sign(
      { userId: user._id },
      "SECRET_KEY",
      { expiresIn: "1h" }
    );

    res.json({
      success: true,
      token,
      username: user.username
    });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
