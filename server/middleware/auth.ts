
import { Request, Response, NextFunction } from "express";
import { getAuth } from "firebase-admin/auth";
import { storage } from "../storage";

export interface AuthRequest extends Request {
  user?: {
    uid: string;
    email: string;
    isAdmin?: boolean;
    isApproved?: boolean;
  };
}

export async function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const token = req.headers.authorization?.split("Bearer ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decodedToken = await getAuth().verifyIdToken(token);
    const user = await storage.getUserByFirebaseUid(decodedToken.uid);
    
    if (!user?.isApproved) {
      return res.status(403).json({ message: "Account not approved" });
    }

    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email || "",
      isAdmin: user?.isAdmin,
      isApproved: user?.isApproved
    };
    
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
}

export function adminMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
  if (!req.user?.isAdmin) {
    return res.status(403).json({ message: "Admin access required" });
  }
  next();
}
