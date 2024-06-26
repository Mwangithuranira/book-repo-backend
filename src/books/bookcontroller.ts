import { Context } from 'hono';
import { createBookService, getBooksService, getBookByIdService, updateBookService, deleteBookService } from '../books/books.service';
import { TIbook, TUbook } from '../drizzle/schema';

export const createBookHandler = async (c: Context) => {
    const book = await c.req.json<TIbook>();
    const message = await createBookService(book);
    return c.json({ message });
};

export const getBooksHandler = async (c: Context) => {
    const books = await getBooksService();
    return c.json(books);
};

export const getBookByIdHandler = async (c: Context) => {
    const id = Number(c.req.param('id'));
    const book = await getBookByIdService(id);
    return book ? c.json(book) : c.notFound();
};

export const updateBookHandler = async (c: Context) => {
    const id = Number(c.req.param('id'));
    const book = await c.req.json<Partial<TIbook>>();
    const message = await updateBookService(id, book);
    return c.json({ message });
};

export const deleteBookHandler = async (c: Context) => {
    const id = Number(c.req.param('id'));
    const message = await deleteBookService(id);
    return c.json({ message });
};
