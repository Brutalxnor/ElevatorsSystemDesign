import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../lib/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.body;

  console.log('Received userId:', userId);  // Confirm what's received

  if (!userId || typeof userId !== 'string') {
    console.error('Invalid userId:', userId);
    return res.status(400).json({ message: 'Valid User ID is required' });
  }

  try {
    const client = await clientPromise;
    const db = client.db('UsersDB');

    // Convert userId to ObjectId
    const objectId = new ObjectId(userId);

    const result = await db.collection('Users').deleteOne({ _id: objectId });

    console.log('Delete result:', result); // Log the delete result

    if (result.deletedCount === 1) {
      res.status(200).json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error in delete operation:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
