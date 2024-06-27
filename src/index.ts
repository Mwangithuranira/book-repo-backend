import { config } from 'dotenv';
import "dotenv/config";
import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';

config();

import bookRouter from './books/bookrouter';

const app = new Hono();

// Enable CORS for all routes
app.use('*', cors({
  origin: process.env.FRONTEND_ORIGIN || '*', // Set your frontend origin here
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
}));

app.route('/api', bookRouter);

const port: number = parseInt(process.env.PORT || '8000', 10);
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port: port,
});