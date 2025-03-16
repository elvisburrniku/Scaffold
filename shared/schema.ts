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

export type ScaffoldingType = "system" | "frame" | "tube";

export type CalculatorInputDimensions = {
  length: number;
  width: number;
  height: number;
  type: ScaffoldingType;
};

export type CalculatorInputArea = {
  area: number;
  height: number;
  type: ScaffoldingType;
};

export type ScaffoldingComponent = {
  quantity: number;
  specs: string;
};

export type CalculationResult = {
  standards: ScaffoldingComponent;
  ledgers: ScaffoldingComponent;
  transoms: ScaffoldingComponent;
  basePlates: ScaffoldingComponent;
  guardRails: ScaffoldingComponent;
  toeBoards: ScaffoldingComponent;
  platforms: ScaffoldingComponent;
  couplers: ScaffoldingComponent;
  totalComponents: number;
  weight: number;
  loadCapacity: number;
  dimensions: string;
  area: number;
  type: string;
  safetyFactor: number;
};
