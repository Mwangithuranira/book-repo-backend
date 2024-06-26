import { config } from 'dotenv';
import "dotenv/config";
import { serve } from '@hono/node-server'
import { Hono } from 'hono'

config();

import  bookRouter  from './books/bookrouter';

const app = new Hono();

app.route('/api', bookRouter);

  

console.log(`Server is running on port ${process.env.PORT}`)
const port:number = 8000;
serve({
  fetch: app.fetch,
  port: port
})