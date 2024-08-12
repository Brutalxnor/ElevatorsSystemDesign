// import { NextApiRequest, NextApiResponse } from 'next';
// import clientPromise from '../../lib/mongodb';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   try {
//     const client = await clientPromise;
//     const db = client.db('UsersDB');

//     const generalManagers = await db.collection('Users').find({ role: 'General Manager' }).toArray();
//     const headOfSales = await db.collection('Users').find({ role: 'Head of Sales' }).toArray();
//     const salesOperations = await db.collection('Users').find({ role: 'Sales Operation' }).toArray();
//     const teamLeaders = await db.collection('Users').find({ role: 'Sales Team Leader' }).toArray();
//     const sales = await db.collection('Users').find({ role: 'Sales' }).toArray();

//     res.status(200).json({
//       generalManagers,
//       headOfSales,
//       salesOperations,
//       teamLeaders,
//       sales,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// }



// import { NextApiRequest, NextApiResponse } from 'next';
// import clientPromise from '../../lib/mongodb';
// import { ObjectId } from 'mongodb';

// // Define interfaces
// interface UserDocument {
//   _id: ObjectId;
//   parentId?: string | ObjectId | null; // Adjusting for flexibility in parentId types
//   username: string;
//   role: string;
// }

// interface UserNode {
//   id: string;
//   parentId: string | null;
//   name: string;
//   role: string;
//   children: UserNode[];
// }

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   try {
//     const client = await clientPromise;
//     const db = client.db('UsersDB');

//     // Fetch all users from the collection
//     const users = await db.collection<UserDocument>('Users').find({}).toArray();

//     console.log('Fetched Users:', users);

//     // Convert the flat user list to a map for efficient lookup
//     const userMap: { [key: string]: UserNode } = {};

//     users.forEach((user) => {
//       const parentId =
//         user.parentId && typeof user.parentId !== 'string'
//           ? user.parentId.toHexString()
//           : user.parentId || null;

//       userMap[user._id.toHexString()] = {
//         id: user._id.toHexString(),
//         parentId: parentId,
//         name: user.username,
//         role: user.role,
//         children: [],
//       };
//     });

//     // Build the tree
//     const orgChart: UserNode[] = [];

//     Object.values(userMap).forEach((userNode) => {
//       if (userNode.parentId && userMap[userNode.parentId]) {
//         userMap[userNode.parentId].children.push(userNode);
//       } else {
//         orgChart.push(userNode); // Top-level nodes
//       }
//     });

//     console.log('Organization Chart:', orgChart);

//     res.status(200).json(orgChart);
//   } catch (error: unknown) {
//     console.error('Failed to fetch organizational chart:', error);
//     if (error instanceof Error) {
//       res.status(500).json({ message: error.message });
//     } else {
//       res.status(500).json({ message: 'Unknown server error' });
//     }
//   }
// }











// import { NextApiRequest, NextApiResponse } from 'next';
// import clientPromise from '../../lib/mongodb';
// import { ObjectId } from 'mongodb';

// interface UserDocument {
//   _id: ObjectId;
//   parentId: ObjectId | null;
//   username: string;
//   role: string;
// }

// interface UserNode {
//   id: string;
//   name: string;
//   role: string;
//   children: UserNode[];
// }

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   try {
//     const client = await clientPromise;
//     const db = client.db('UsersDB');

//     // Fetch all users from the collection
//     const users = await db.collection<UserDocument>('Users').find({}).toArray();

//     // Convert the flat user list to a map for efficient lookup
//     const userMap: { [key: string]: UserNode } = {};

//     users.forEach((user) => {
//       userMap[user._id.toHexString()] = {
//         id: user._id.toHexString(),
//         name: user.username,
//         role: user.role,
//         children: [],
//       };
//     });

//     // Build the tree
//     const orgChart: UserNode[] = [];

//     Object.values(userMap).forEach((userNode) => {
//       const parentUser = users.find((user) => user._id.toHexString() === userNode.id);
//       if (parentUser?.parentId && userMap[parentUser.parentId.toHexString()]) {
//         userMap[parentUser.parentId.toHexString()].children.push(userNode);
//       } else {
//         orgChart.push(userNode); // Top-level nodes (General Managers)
//       }
//     });

//     res.status(200).json(orgChart);
//   } catch (error) {
//     console.error('Failed to fetch organizational chart:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// }









// import { NextApiRequest, NextApiResponse } from 'next';
// import clientPromise from '../../lib/mongodb';
// import { ObjectId } from 'mongodb';

// interface UserDocument {
//   _id: ObjectId;
//   parentId: ObjectId | null;
//   username: string;
//   role: string;
// }

// interface UserNode {
//   id: string;
//   name: string;
//   role: string;
//   children: UserNode[];
// }

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   try {
//     const client = await clientPromise;
//     const db = client.db('UsersDB');

//     // Fetch all users from the collection
//     const users = await db.collection<UserDocument>('Users').find({}).toArray();

//     // Convert the flat user list to a map for efficient lookup
//     const userMap: { [key: string]: UserNode } = {};

//     users.forEach((user) => {
//       userMap[user._id.toHexString()] = {
//         id: user._id.toHexString(),
//         name: user.username,
//         role: user.role,
//         children: [],
//       };
//     });

//     // Build the tree
//     const orgChart: UserNode[] = [];

//     Object.values(userMap).forEach((userNode) => {
//       const parentUser = users.find((user) => user._id.toHexString() === userNode.id);
//       if (parentUser?.parentId && userMap[parentUser.parentId.toHexString()]) {
//         userMap[parentUser.parentId.toHexString()].children.push(userNode);
//       } else {
//         orgChart.push(userNode); // Top-level nodes (General Managers)
//       }
//     });

//     res.status(200).json(orgChart);
//   } catch (error) {
//     console.error('Failed to fetch organizational chart:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// }


import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../lib/mongodb';
import { ObjectId } from 'mongodb';

interface UserDocument {
  _id: ObjectId;
  parentId: ObjectId | null;
  username: string;
  role: string;
}

interface UserNode {
  _id: string;
  username: string;
  role: string;
  children: UserNode[];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const client = await clientPromise;
    const db = client.db('UsersDB');

    // Fetch all users from the collection
    const users = await db.collection<UserDocument>('Users').find({}).toArray();

    // Convert the flat user list to a map for efficient lookup
    const userMap: { [key: string]: UserNode } = {};

    users.forEach((user) => {
      userMap[user._id.toHexString()] = {
        _id: user._id.toHexString(),
        username: user.username,
        role: user.role,
        children: [],
      };
    });

    // Build the tree
    const orgChart: UserNode[] = [];

    users.forEach((user) => {
      if (user.parentId) {
        const parentId = user.parentId.toHexString();
        if (userMap[parentId]) {
          userMap[parentId].children.push(userMap[user._id.toHexString()]);
        }
      } else {
        orgChart.push(userMap[user._id.toHexString()]); // Top-level nodes (General Managers)
      }
    });

    res.status(200).json(orgChart);
  } catch (error) {
    console.error('Failed to fetch organizational chart:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
