// /pages/api/get-all-users.ts
import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const client = await clientPromise;
    const db = client.db('UsersDB');

    // Fetch all users
    const users = await db.collection('Users').find({}).toArray();

    res.status(200).json(users);
  } catch (error) {
    console.error('Failed to fetch all users:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
