import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import pool from '../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { username, password, gender } = req.body;
    try {
      const usernameExists = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
      if (usernameExists.rows.length > 0) {
        res.status(400).json({ success: false, error: 'Username already exists' });
        return;
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      await pool.query('INSERT INTO users (username, password, role, gender) VALUES ($1, $2, $3, $4)', [username, hashedPassword, 'visitor', gender]);

      res.status(201).json({ success: true });
    } catch (error) {
      console.error('Error registering:', error);
      res.status(500).json({ success: false, error: 'An error occurred' });
    }
  } else {
    res.status(405).end();
  }
}
