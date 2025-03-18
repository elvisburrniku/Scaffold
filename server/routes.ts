import type { Express, Request } from "express";
import { createServer, type Server } from "http";
import { auth as firebaseAuth } from "firebase-admin";
import { getAuth } from "firebase-admin/auth";
import { storage } from "./storage";
import { insertWaitlistSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // Add to waitlist route
  app.post("/api/waitlist", async (req, res) => {
    try {
      const parsedData = insertWaitlistSchema.safeParse(req.body);
      
      if (!parsedData.success) {
        const validationError = fromZodError(parsedData.error);
        return res.status(400).json({ 
          success: false, 
          message: validationError.message 
        });
      }

      const newWaitlistEntry = await storage.addToWaitlist(parsedData.data);
      
      return res.status(201).json({ 
        success: true,
        message: "Successfully added to waitlist", 
        data: { email: newWaitlistEntry.email } 
      });
    } catch (error) {
      console.error("Error adding to waitlist:", error);
      return res.status(500).json({ 
        success: false, 
        message: "Failed to add to waitlist. Please try again." 
      });
    }
  });

  // Get waitlist entries (for admin purposes, not used in frontend)
  app.get("/api/waitlist", async (req, res) => {
    try {
      const waitlistEntries = await storage.getWaitlistEmails();
      return res.status(200).json({ 
        success: true, 
        data: waitlistEntries 
      });
    } catch (error) {
      console.error("Error retrieving waitlist:", error);
      return res.status(500).json({ 
        success: false, 
        message: "Failed to retrieve waitlist" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
