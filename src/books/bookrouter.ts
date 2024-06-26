import { Hono } from 'hono';
import { createBookHandler, getBooksHandler, getBookByIdHandler, updateBookHandler, deleteBookHandler } from '../books/bookcontroller';

const bookRouter = new Hono();

bookRouter.post('/books', createBookHandler);
bookRouter.get('/books', getBooksHandler);
bookRouter.get('/books/:id', getBookByIdHandler);
bookRouter.put('/books/:id', updateBookHandler);
bookRouter.delete('/books/:id', deleteBookHandler);

export default bookRouter;

