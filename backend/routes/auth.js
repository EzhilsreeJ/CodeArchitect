import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

// 💾 Register
router.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  try {
    const exists = await User.findOne({ username });
    if (exists) return res.status(400).json({ error: "User exists" });

    const hashed = await bcrypt.hash(password, 12);

    const user = await User.create({ username, password: hashed });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({ user: { username: user.username }, token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔐 Login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ error: "Invalid login" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: "Invalid login" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ user: { username }, token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
