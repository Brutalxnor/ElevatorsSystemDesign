import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../lib/mongodb';
import bcrypt from 'bcryptjs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { username, password } = req.body;

  try {
    const client = await clientPromise;
    const db = client.db('UsersDB');

    const existingUser = await db.collection('Users').findOne({ username });

    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await db.collection('Users').insertOne({
      username,
      password: hashedPassword,
      role: 'Sales', // Default role, can be changed later
    });

    res.status(200).json({ user: { username, role: 'Sales', id: result.insertedId } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
