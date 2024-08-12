// pages/api/get-parent-users.ts
import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const client = await clientPromise;
    const db = client.db('UsersDB');

    // Fetch only users with roles that can be parents
    const parentUsers = await db
      .collection('Users')
      .find({
        $or: [
          { role: 'General Manager' },
          { role: 'Head of Sales' },
          { role: 'Sales Operations' },
          { role: 'Team Leader' },
        ],
      })
      .toArray();

    res.status(200).json(parentUsers);
  } catch (error) {
    console.error('Failed to fetch parent users:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
