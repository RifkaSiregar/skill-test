import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import pool from '../../lib/db';
import { setCookie } from 'nookies';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    try {
      const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

      if (result.rows.length > 0) {
        const hashedPasswordFromDB = result.rows[0].password;
        const passwordMatch = await bcrypt.compare(password, hashedPasswordFromDB);

        if (passwordMatch) {
          const userRole = result.rows[0].role;
          setCookie({ res }, 'userRole', userRole, {
            maxAge: 24 * 60 * 60,
            path: '/',
          });
          res.status(200).json({ success: true, role: userRole });
        } else {
          res.status(401).json({ success: false, error: 'Invalid username or password' });
        }
      } else {
        res.status(401).json({ success: false, error: 'Invalid username or password' });
      }
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ success: false, error: 'An error occurred' });
    }
  } else {
    res.status(405).end();
  }
}
