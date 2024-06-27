import { Context } from "hono";
import { bookService, getbookService, createbookService, updatebookService, deletebookService } from "./books.service";
import bcrypt from 'bcrypt';

export const listBooks = async (c: Context) => {
    try {
        const limit = Number(c.req.query('limit'));
        const data = await bookService(limit);
        if (data == null || data.length == 0) {
            return c.text("Books not found", 404);
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
}

export const getBookById = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        const book = await getbookService(id);
        if (book == undefined) {
            return c.text("Book not found", 404);
        }
        return c.json(book, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
}

export const createBook = async (c: Context) => {
    try {
        const book = await c.req.json();
        const createdBook = await createbookService(book);

        if (!createdBook) return c.text("Book not created", 404);
        return c.json({ msg: createdBook }, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
}

export const updateBook = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        const book = await c.req.json();
        const searchedBook = await getbookService(id);
        if (searchedBook == undefined) return c.text("Book not found", 404);
        
        const res = await updatebookService(id, book);
        if (!res) return c.text("Book not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
}

export const deleteBook = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        const book = await getbookService(id);
        if (book == undefined) return c.text("Book not found", 404);
        
        const res = await deletebookService(id);
        if (!res) return c.text("Book not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
}
