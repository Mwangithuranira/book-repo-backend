import { pgTable, serial, text, varchar, integer, decimal, date } from 'drizzle-orm/pg-core';
import { relations } from "drizzle-orm";

// Define the reader table
export const readerTable = pgTable("reader", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 100 }),
    email: varchar("email", { length: 100 }),
    birthdate: date("birthdate"),
    read_at: date("created_at").default("now()"),
});

// Define the genre table
export const genreTable = pgTable("genre", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 100 }),
    description: text("description"),
});

// Define the book table
export const bookTable = pgTable("book", {
    id: serial("id").primaryKey(),
    title: varchar("title", { length: 100 }),
    author: varchar("author", { length: 100 }),
    price: decimal("price"),
    publicationyear: date("published"),
    genre_id: integer("genre_id").references(() => genreTable.id),
    targetedgroup: varchar("targetedgroup", { length: 100 }),
    reader_id: integer("reader_id").references(() => readerTable.id),
});

// Define the book author table
export const bookAuthorTable = pgTable("book_author", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 100 }),
    birthdate: date("birthdate"),
    bio: text("bio"),
    book_id: integer("book_id").references(() => bookTable.id),
});

// Define relationships
export const readerRelations = relations(readerTable, ({ one, many }) => ({
    books: many(bookTable),
}));

export const genreRelations = relations(genreTable, ({ one, many }) => ({
    books: many(bookTable),
}));

export const bookRelations = relations(bookTable, ({ one, many }) => ({
    reader: one(readerTable, {
        fields: [bookTable.reader_id],
        references: [readerTable.id],
    }),
    genre: one(genreTable, {
        fields: [bookTable.genre_id],
        references: [genreTable.id],
    }),
    authors: many(bookAuthorTable),
}));

export const bookAuthorRelations = relations(bookAuthorTable, ({ one, many }) => ({
    book: one(bookTable, {
        fields: [bookAuthorTable.book_id],
        references: [bookTable.id],
    }),
}));


//type definitions
export type TIreader = typeof readerTable.$inferInsert;
export type TUreader = typeof readerTable.$inferSelect;
export type TIbook = typeof bookTable.$inferInsert;
export type TUbook = typeof bookTable.$inferSelect;
export type TIgenre = typeof genreTable.$inferInsert;
export type TUgenre = typeof genreTable.$inferSelect;
export type TIbookAuthor = typeof bookAuthorTable.$inferInsert;
export type TUbookAuthor = typeof bookAuthorTable.$inferSelect;



