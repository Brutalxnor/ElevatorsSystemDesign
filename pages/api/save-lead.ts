import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../lib/mongodb';
import { ObjectId } from 'mongodb'; // Import ObjectId

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { _id, name, mobileNumber, status, feedback, assignedSales } = req.body;

    try {
      const client = await clientPromise;
      const db = client.db('LeadDB');
      const collection = db.collection('Lead');

      if (_id) {
        // Update the existing lead
        await collection.updateOne(
          { _id: new ObjectId(_id) }, // Use the 'new' keyword
          { $set: { name, mobileNumber, status, feedback, assignedSales } }
        );
      } else {
        // Insert a new lead
        await collection.insertOne({ name, mobileNumber, status, feedback, assignedSales });
      }

      res.status(200).json({ message: 'Lead saved successfully' });
    } catch (error) {
      console.error('Error saving lead:', error);
      res.status(500).json({ error: 'Failed to save lead' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
