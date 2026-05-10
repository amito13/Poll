import {
  pgTable,
  text,
  boolean,
  timestamp,
  integer,
} from "drizzle-orm/pg-core";
import { relations} from "drizzle-orm";
/* =========================
   USERS
========================= */

export const users = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),

  name: text().notNull(),

  email: text().notNull().unique(),

  password: text().notNull(),

  createdAt: timestamp().defaultNow(),
});

/* =========================
   POLLS
========================= */

export const polls = pgTable("polls", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),

  creatorId: integer()
    .references(() => users.id)
    .notNull(),

  title: text().notNull(),

  description: text(),

  slug: text().notNull().unique(),

  allowAnonymous: boolean().default(true),

  expiresAt: timestamp(),

  isPublished: boolean().default(false),

  createdAt: timestamp().defaultNow(),

  updatedAt: timestamp().defaultNow(),
});

/* =========================
   QUESTIONS
========================= */

export const questions = pgTable("questions", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),

  pollId: integer()
    .references(() => polls.id)
    .notNull(),

  title: text().notNull(),

  required: boolean().default(true),

  order: integer().notNull(),

  createdAt: timestamp().defaultNow(),
});

/* =========================
   OPTIONS
========================= */

export const options = pgTable("options", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),

  questionId: integer()
    .references(() => questions.id)
    .notNull(),

  text: text().notNull(),
});

/* =========================
   RESPONSES
========================= */

export const responses = pgTable("responses", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),

  pollId: integer()
    .references(() => polls.id)
    .notNull(),

  userId: integer().references(() => users.id),

  anonymousToken: text(),

  submittedAt: timestamp().defaultNow(),
});

/* =========================
   ANSWERS
========================= */

export const answers = pgTable("answers", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),

  responseId: integer()
    .references(() => responses.id)
    .notNull(),

  questionId: integer()
    .references(() => questions.id)
    .notNull(),

  optionId: integer()
    .references(() => options.id)
    .notNull(),

  createdAt: timestamp().defaultNow(),
});
export const pollsRelations = relations( //one poll has many questions
  polls,
  ({ many }) => ({
    questions: many(questions),
  })
);
// Question
// → belongs to Poll

// Question
// → has many Options
export const questionsRelations = relations(
  questions,
  ({ one, many }) => ({
    poll: one(polls, {
      fields: [questions.pollId],
      references: [polls.id],
    }),

    options: many(options),
  })
);

export const optionsRelations = relations(
  options,
  ({ one }) => ({
    question: one(questions, {
      fields: [options.questionId],
      references: [questions.id],
    }),
  })
);