// authMiddleware.ts
import { Context, Next } from 'hono';
import { verify } from 'hono/jwt';

export const authMiddleware = async (c: Context, next: Next) => {
  const authHeader = c.req.header('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return c.json({ message: 'Unauthorized: Missing or invalid token' }, 403);
  }

  const token = authHeader.split(' ')[1];
  const jwtsecret = c.env.JWT_SECRET;

  try {
    const decoded = await verify(token, jwtsecret);
    console.log(decoded);
    c.set('user', decoded); // Set the decoded user information in the context
    await next(); // Proceed to the route handler if authentication passes
  } catch (err) {
    return c.json({ message: 'Unauthorized: Invalid token' }, 403);
  }
};
