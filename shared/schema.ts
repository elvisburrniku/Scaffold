import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const waitlist = pgTable("waitlist", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  createdAt: text("created_at").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertWaitlistSchema = createInsertSchema(waitlist).pick({
  email: true,
}).extend({
  email: z.string().email("Please enter a valid email address"),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertWaitlist = z.infer<typeof insertWaitlistSchema>;
export type Waitlist = typeof waitlist.$inferSelect;

export type FrameSize = 
  | "mason-frame-91x152" 
  | "mason-frame-152x152" 
  | "mason-frame-183x152" 
  | "mason-frame-193x152"
  | "mason-frame-193x91" 
  | "mason-frame-193x107" 
  | "mason-frame-198x152"
  | "mason-frame-220x70";

export type PlatformLength = 
  | "platform-213" 
  | "platform-244" 
  | "platform-250"
  | "platform-305";

export type WorkLevel = 1 | 2 | 3 | 4 | 5;

export type ScaffoldingType = "mason-frame";

export type CalculatorInputDimensions = {
  length: number;
  height: number;
  frameSize: FrameSize;
  platformLength: PlatformLength;
  workLevels: WorkLevel;
};

export type CalculatorInputArea = {
  area: number;
  height: number;
  frameSize: FrameSize;
  platformLength: PlatformLength;
  workLevels: WorkLevel;
};

export type ScaffoldingComponent = {
  quantity: number;
  specs: string;
};

export type CalculationResult = {
  frames: ScaffoldingComponent;
  crossBraces: ScaffoldingComponent;
  guardrails: ScaffoldingComponent;
  basePlates: ScaffoldingComponent;
  platforms: ScaffoldingComponent;
  screw: ScaffoldingComponent;
  toeBoards: ScaffoldingComponent;
  outriggers: ScaffoldingComponent;
  ladders: ScaffoldingComponent;
  totalComponents: number;
  weight: number;
  loadCapacity: number;
  dimensions: string;
  area: number;
  frameSize: string;
  platformLength: string;
  workLevels: number;
  safetyFactor: number;
};
