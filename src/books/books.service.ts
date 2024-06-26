import { eq } from 'drizzle-orm';
import db from '../drizzle/db';
import { TIbook, TUbook, bookTable } from '../drizzle/schema';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

const sendNotification = async (subject: string, text: string) => {
    await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: 'recipient@example.com', // Set the recipient email
        subject,
        text,
    });
};

export const createBookService = async (book: TIbook) => {
    await db.insert(bookTable).values(book);
    return "Book created successfully";
};

export const getBooksService = async (limit?: number): Promise<TUbook[] | null> => {
    if (limit) {
        return await db.query.bookTable.findMany({ limit });
    }
    return await db.query.bookTable.findMany(
        // {
        //    columns:{
        //      title:true,
        //      author:true,
        //      publicationyear:true
        //    } 
        // }
    );
};

export const getBookByIdService = async (id: number): Promise<TUbook | undefined> => {
    return await db.query.bookTable.findFirst({
        where: eq(bookTable.id, id),
    });
};

export const updateBookService = async (id: number, book: Partial<TIbook>) => {
    await db.update(bookTable).set(book).where(eq(bookTable.id, id));
    await sendNotification('Book Updated', `Book with ID ${id} has been updated.`);
    return "Book updated successfully";
};

export const deleteBookService = async (id: number) => {
    await db.delete(bookTable).where(eq(bookTable.id, id));
    await sendNotification('Book Deleted', `Book with ID ${id} has been deleted.`);
    return "Book deleted successfully";
};
