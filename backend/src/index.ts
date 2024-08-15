import { Hono } from 'hono'
import mainrouter from './routes/router';
const app = new Hono()
app.use('*', async (c, next) => {
    c.header('Access-Control-Allow-Origin', '*')
    c.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    c.header('Access-Control-Allow-Headers', 'Content-Type')
    await next()
  })
  
app.route('/api/v1',mainrouter);

export default app
