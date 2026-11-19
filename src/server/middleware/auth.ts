import { Request, Response, NextFunction } from 'express';
import admin from 'firebase-admin';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT || '';
  admin.initializeApp({
    credential: admin.credential.cert(require(serviceAccountPath)),
  });
}

/**
 * Middleware to verify Firebase ID token and attach decoded token to request.
 * Expects `Authorization: Bearer <idToken>` header.
 */
export const verifyFirebaseToken = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or malformed Authorization header' });
  }
  const idToken = authHeader.split('Bearer ')[1];
  try {
    const decoded = await admin.auth().verifyIdToken(idToken);
    // Attach user info to request for later use
    (req as any).user = decoded;
    next();
  } catch (error) {
    console.error('Firebase token verification error:', error);
    res.status(401).json({ error: 'Invalid Firebase ID token' });
  }
};

/**
 * Role‑based access control middleware.
 * Usage: `authorizeRoles('admin')` or `authorizeRoles('student', 'recruiter')`.
 */
export const authorizeRoles = (...allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;
    if (!user) {
      return res.status(401).json({ error: 'User not authenticated' });
    }
    const role = (user as any).role || 'student'; // default role if not set
    if (!allowedRoles.includes(role)) {
      return res.status(403).json({ error: `Access denied for role '${role}'` });
    }
    next();
  };
};
