// pages/api/get-sales-people.ts
import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const client = await clientPromise;
    const db = client.db('UsersDB'); // Assuming salespeople and team leaders are stored in UsersDB

    // Find users with role 'Sales' or 'Team Leader'
    const salesPeopleAndLeaders = await db.collection('Users').find({
      role: { $in: ['Sales', 'Team Leader', 'Head of Sales'] }
    }).toArray();

    res.status(200).json({ salesPeopleAndLeaders });
  } catch (error) {
    console.error('Error fetching salespeople and team leaders:', error);
    res.status(500).json({ error: 'Failed to fetch salespeople and team leaders' });
  }
}
