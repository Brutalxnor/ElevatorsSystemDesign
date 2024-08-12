// // pages/api/assign-role.ts

// import { NextApiRequest, NextApiResponse } from 'next';
// import bcrypt from 'bcryptjs';
// import clientPromise from '../../lib/mongodb';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const { username, password, role } = req.body;

//   if (!username || !password || !role) {
//     return res.status(400).json({ message: 'Username, password, and role are required' });
//   }

//   try {
//     const client = await clientPromise;
//     const db = client.db('UsersDB'); // Replace with your database name

//     // Check if the username already exists
//     const existingUser = await db.collection('Users').findOne({ username });

//     if (existingUser) {
//       return res.status(400).json({ message: 'Username already exists' });
//     }

//     // Hash the password before saving
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Save the new user to the database
//     await db.collection('Users').insertOne({
//       username,
//       password: hashedPassword,
//       role,
//     });

//     res.status(200).json({ message: 'User created successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// }



import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import clientPromise from '../../lib/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { username, password, role, parentId } = req.body;

  console.log("Received data:", { username, password, role, parentId }); // Add this line to log received data

  if (!username || !password || !role) {
    return res.status(400).json({ message: 'Username, password, and role are required' });
  }

  try {
    const client = await clientPromise;
    const db = client.db('UsersDB'); // Replace with your database name

    // Check if the username already exists
    const existingUser = await db.collection('Users').findOne({ username });

    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Prepare the user data
    const newUser = {
      username,
      password: hashedPassword,
      role,
      parentId: parentId ? new ObjectId(parentId) : null, // Add parentId if provided
    };

    console.log("User data to be inserted:", newUser); // Add this line to log the user data

    // Save the new user to the database
    await db.collection('Users').insertOne(newUser);

    res.status(200).json({ message: 'User created successfully' });
  } catch (error) {
    console.error("Error while creating user:", error); // Add this line to log any errors
    res.status(500).json({ message: 'Internal server error' });
  }
}
