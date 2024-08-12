import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { parentId, name, role } = req.body;

  if (!name || !role) {
    return res.status(400).json({ message: 'Name and role are required' });
  }

  try {
    const client = await clientPromise;
    const db = client.db('UsersDB');

    // Add the new user with the specified parentId
    const result = await db.collection('Users').insertOne({
      username: name,
      role: role,
      parentId: parentId || null, // Set parentId, or null if it's a top-level node
    });

    res.status(200).json({ message: 'Subordinate added successfully', userId: result.insertedId });
  } catch (error) {
    console.error('Failed to add subordinate:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
