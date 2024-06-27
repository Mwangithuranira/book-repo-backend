import { Hono } from 'hono';
import { listBooks, getBookById, createBook, updateBook, deleteBook } from './bookcontroller';

const router = new Hono();

router.get('/books', listBooks);
router.get('/books/:id', getBookById);
router.post('/books', createBook);
router.put('/books/:id', updateBook);
router.delete('/books/:id', deleteBook);

export default router;

