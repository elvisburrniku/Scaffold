import { waitlist, type Waitlist, type InsertWaitlist } from "@shared/schema";

export interface IStorage {
  addToWaitlist(email: InsertWaitlist): Promise<Waitlist>;
  getWaitlistEmails(): Promise<Waitlist[]>;
}

export class MemStorage implements IStorage {
  private waitlist: Map<number, Waitlist>;
  currentId: number;

  constructor() {
    this.waitlist = new Map();
    this.currentId = 1;
  }

  async addToWaitlist(insertWaitlist: InsertWaitlist): Promise<Waitlist> {
    const id = this.currentId++;
    const newEntry: Waitlist = { 
      ...insertWaitlist, 
      id, 
      createdAt: new Date().toISOString() 
    };
    this.waitlist.set(id, newEntry);
    return newEntry;
  }

  async getWaitlistEmails(): Promise<Waitlist[]> {
    return Array.from(this.waitlist.values());
  }
}

export const storage = new MemStorage();
