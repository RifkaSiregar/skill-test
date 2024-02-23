import { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { userId },
    method,
    body,
  } = req;

  switch (method) {
    case 'GET':
      try {
        const result = await pool.query('SELECT * FROM users');
        res.status(200).json(result.rows);
      } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
      break;
    case 'PATCH':
      try {
        const { role } = body;
        const result = await pool.query('UPDATE users SET role = $1 WHERE user_id = $2', [
          role,
          userId,
        ]);
        res.status(200).json({ message: 'User role updated successfully' });
      } catch (error) {
        console.error('Error updating user role:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
      break;
    case 'DELETE':
      try {
        const result = await pool.query('DELETE FROM users WHERE user_id = $1', [userId]);
        res.status(200).json({ message: 'User deleted successfully' });
      } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'PATCH', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
