import "dotenv/config";
import { serve } from '@hono/node-server'
import { Hono } from 'hono'


const app = new Hono()





console.log(`Server is running on port ${process.env.PORT}`)
const port:number = 8000;
serve({
  fetch: app.fetch,
  port: port
})