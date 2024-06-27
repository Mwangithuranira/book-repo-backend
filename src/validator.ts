import { z } from 'zod'
import { Context } from 'hono';
import { ZodSchema } from 'zod';
import { bookTable } from './drizzle/schema';

export const validate = (schema: ZodSchema) => {
  return async (c: Context, next: () => Promise<void>) => {
    try {
      const body = await c.req.json();
      schema.parse(body);
      c.req.addValidatedData = body; // Add validated data to request context
      await next();
    } catch (error) {
      return c.json({ error:error }, 400);
    }
  };
};


export const bookSchema = z.object({
  title: z.string(),
  author: z.string(),
    publicationyear: z.date(),
});
