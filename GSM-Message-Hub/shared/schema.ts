import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// === TABLE DEFINITIONS ===
export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  group: text("group").default("General"),
  email: text("email"),
  avatar: text("avatar"),
  isFavorite: boolean("is_favorite").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  direction: text("direction").notNull(), // 'inbound' | 'outbound'
  status: text("status").notNull(), // 'queued' | 'sent' | 'delivered' | 'failed' | 'received'
  recipient: text("recipient").notNull(),
  content: text("content").notNull(),
  simSlot: integer("sim_slot").default(1),
  timestamp: timestamp("timestamp").defaultNow(),
});

export const settings = pgTable("settings", {
  id: serial("id").primaryKey(),
  key: text("key").notNull().unique(),
  value: text("value").notNull(),
  category: text("category").default("general"),
});

// === SCHEMAS ===
export const insertContactSchema = createInsertSchema(contacts).omit({ id: true, createdAt: true });
export const insertMessageSchema = createInsertSchema(messages).omit({ id: true, timestamp: true });
export const insertSettingSchema = createInsertSchema(settings).omit({ id: true });

// === TYPES ===
export type Contact = typeof contacts.$inferSelect;
export type InsertContact = z.infer<typeof insertContactSchema>;
export type Message = typeof messages.$inferSelect;
export type InsertMessage = z.infer<typeof insertMessageSchema>;
export type Setting = typeof settings.$inferSelect;

// Request types
export type CreateContactRequest = InsertContact;
export type UpdateContactRequest = Partial<InsertContact>;
export type CreateMessageRequest = InsertMessage;

// Dashboard Stats Type
export interface DashboardStats {
  totalSent: number;
  totalReceived: number;
  failed: number;
  credits: number;
  activeSims: number;
  signalStrength: number;
}
