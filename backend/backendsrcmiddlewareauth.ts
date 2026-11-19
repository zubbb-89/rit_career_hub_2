import { Request, Response, NextFunction } from "express";
import admin from "firebase-admin";
import { User } from "../models/User";

admin.initializeApp({
  credential: admin.credential.cert(require(process.env.FIREBASE_SERVICE_ACCOUNT!)),
});

export interface AuthRequest extends Request {
  user?: { uid: string; role: string };
}

export async function verifyFirebaseToken(req: AuthRequest, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) return res.status(401).json({ message: "Missing token" });
  const token = header.split(" ")[1];
  try {
    const decoded = await admin.auth().verifyIdToken(token);
    const dbUser = await User.findOne({ uid: decoded.uid });
    if (!dbUser) return res.status(403).json({ message: "User not registered" });
    req.user = { uid: decoded.uid, role: dbUser.role };
    next();
  } catch (e) {
    console.error(e);
    res.status(401).json({ message: "Invalid token" });
  }
}

export function requireRole(role: string) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) return res.status(401).json({ message: "Unauthenticated" });
    if (req.user.role !== role) return res.status(403).json({ message: "Forbidden" });
    next();
  };
}