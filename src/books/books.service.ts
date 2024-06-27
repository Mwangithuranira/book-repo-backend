import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TIbook, TUbook, bookTable } from "../drizzle/schema";

export const bookService = async (limit?: number): Promise<TUbook[] | null> => {
    if (limit) {
        return await db.query.bookTable.findMany({
            limit: limit
        });
    }
    return await db.query.bookTable.findMany();
}

export const getbookService = async (id: number): Promise<TIbook | undefined> => {
    return await db.query.bookTable.findFirst({
        where: eq(bookTable.id, id),
    });
}

export const createbookService = async (book: TIbook) => {
    await db.insert(bookTable).values(book);
    return "Book created successfully";
}

export const updatebookService = async (id: number, book: TIbook) => {
    await db.update(bookTable).set(book).where(eq(bookTable.id, id));
    return "Book updated successfully";
}

export const deletebookService = async (id: number) => {
    await db.delete(bookTable).where(eq(bookTable.id, id));
    return "Book deleted successfully";
}

