import { Router } from "express";
import admin from "firebase-admin";
import { User } from "../models/User";

const router = Router();

// Frontend will send Firebase ID token after sign‑in
router.post("/login", async (req, res) => {
  const { idToken } = req.body;
  try {
    const decoded = await admin.auth().verifyIdToken(idToken);
    let user = await User.findOne({ uid: decoded.uid });
    if (!user) {
      // First‑time login → create a student user by default
      user = await User.create({ uid: decoded.uid, email: decoded.email!, role: "student" });
    }
    res.json({ uid: user.uid, email: user.email, role: user.role });
  } catch (e) {
    console.error(e);
    res.status(401).json({ message: "Invalid Firebase token" });
  }
});

router.get("/me", async (req, res) => {
  // token already validated by middleware in client side; just echo back role for UI
  const header = req.headers.authorization?.split(" ")[1];
  if (!header) return res.status(401).json({ message: "Missing token" });
  const decoded = await admin.auth().verifyIdToken(header);
  const user = await User.findOne({ uid: decoded.uid });
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json({ uid: user.uid, role: user.role });
});

export default router;