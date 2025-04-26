import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const serverSettings = pgTable("server_settings", {
  id: serial("id").primaryKey(),
  serverId: text("server_id").notNull().unique(),
  prefix: text("prefix").default("!"),
  autoRespond: boolean("auto_respond").default(true),
  language: text("language").default("en"),
});

export const insertServerSettingsSchema = createInsertSchema(serverSettings).pick({
  serverId: true,
  prefix: true,
  autoRespond: true,
  language: true,
});

export const botStats = pgTable("bot_stats", {
  id: serial("id").primaryKey(),
  questionsAnswered: integer("questions_answered").default(0),
  codeFixed: integer("code_fixed").default(0),
  conceptsExplained: integer("concepts_explained").default(0),
  lastUpdated: timestamp("last_updated").defaultNow(),
});

export const insertBotStatsSchema = createInsertSchema(botStats).pick({
  questionsAnswered: true,
  codeFixed: true,
  conceptsExplained: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertServerSettings = z.infer<typeof insertServerSettingsSchema>;
export type ServerSettings = typeof serverSettings.$inferSelect;

export type InsertBotStats = z.infer<typeof insertBotStatsSchema>;
export type BotStats = typeof botStats.$inferSelect;
