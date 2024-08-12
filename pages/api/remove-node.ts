import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ message: 'ID is required' });
  }

  try {
    const client = await clientPromise;
    const db = client.db('UsersDB');

    // Function to recursively delete a node and its children
    const deleteNodeAndChildren = async (nodeId: any) => {
      const children = await db.collection('Users').find({ parentId: nodeId }).toArray();
      for (const child of children) {
        await deleteNodeAndChildren(child._id);
      }
      await db.collection('Users').deleteOne({ _id: nodeId });
    };

    await deleteNodeAndChildren(id);

    res.status(200).json({ message: 'Node and its children removed successfully' });
  } catch (error) {
    console.error('Failed to remove node:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
