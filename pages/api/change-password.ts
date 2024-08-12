import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../lib/mongodb';
import bcrypt from 'bcryptjs';
import { ObjectId } from 'mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { userId, newPassword } = req.body;

    if (!userId || !newPassword) {
      return res.status(400).json({ error: 'User ID and new password are required.' });
    }

    try {
      const client = await clientPromise;
      const db = client.db('UsersDB'); // Corrected database name
      const collection = db.collection('Users'); // Replace with your actual collection name

      // Hash the new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Update the user's password
      const result = await collection.updateOne(
        { _id: new ObjectId(userId) },
        { $set: { password: hashedPassword } }
      );

      if (result.modifiedCount === 1) {
        res.status(200).json({ message: 'Password changed successfully.' });
      } else {
        res.status(404).json({ error: 'User not found.' });
      }
    } catch (error) {
      console.error('Error changing password:', error);
      res.status(500).json({ error: 'Failed to change password.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
