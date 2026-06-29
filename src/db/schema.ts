import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

// Lead capture table for the 7 Days Results Bootcamp opt-in funnel.
// Each row is a prospect who submitted their name + email before being
// redirected to the affiliate sales page.
export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  source: text("source").default("landing-page"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Lead = typeof leads.$inferSelect;
