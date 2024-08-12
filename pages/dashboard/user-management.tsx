// // pages/dashboard/user-management.tsx

// "use client";

// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { useAuth } from '../../contexts/AuthContext';
// import { Box, Button, TextField, Typography, MenuItem } from '@mui/material';

// const UserManagement = () => {
//   const { user } = useAuth();
//   const router = useRouter();

//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [role, setRole] = useState('');

//   useEffect(() => {
//     if (user?.role !== 'General Manager') {
//       router.push('/unauthorized'); // Redirect to an unauthorized page
//     }
//   }, [user, router]);

//   if (user?.role !== 'General Manager') {
//     return null; // Optionally, render nothing until the redirect happens
//   }

//   const handleAddUser = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const response = await fetch('/api/assign-role', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ username, password, role }),
//     });

//     if (response.ok) {
//       alert('User added successfully!');
//       setUsername('');
//       setPassword('');
//       setRole('');
//     } else {
//       alert('Failed to add user.');
//     }
//   };

//   return (
//     <Box sx={{ padding: '20px' }}>
//       <Typography variant="h4" component="h1" gutterBottom>
//         User Management
//       </Typography>

//       <Box
//         component="form"
//         onSubmit={handleAddUser}
//         sx={{
//           display: 'flex',
//           flexDirection: 'column',
//           gap: '16px',
//           maxWidth: '400px',
//         }}
//       >
//         <Typography variant="h6" gutterBottom>
//           Add New User
//         </Typography>
//         <TextField
//           label="Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           fullWidth
//           required
//         />
//         <TextField
//           label="Password"
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           fullWidth
//           required
//         />
//         <TextField
//           label="Role"
//           select
//           value={role}
//           onChange={(e) => setRole(e.target.value)}
//           fullWidth
//           required
//         >
//           <MenuItem value="General Manager">General Manager</MenuItem>
//           <MenuItem value="Head of Sales">Head of Sales</MenuItem>
//           <MenuItem value="Sales Operation">Sales Operation</MenuItem>
//           <MenuItem value="Sales Team Leader">Sales Team Leader</MenuItem>
//           <MenuItem value="Sales">Sales</MenuItem>
//         </TextField>
//         <Button type="submit" variant="contained" color="success">
//           Add User
//         </Button>
//       </Box>
//     </Box>
//   );
// };

// export default UserManagement;



/////////////////////////





























// // pages/dashboard/user-management.tsx

// "use client";

// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { useAuth } from '../../contexts/AuthContext';
// import { Box, Button, TextField, Typography, MenuItem } from '@mui/material';
// import Tree from 'react-d3-tree';

// interface User {
//   username: string;
//   role: string;
// }

// const UserManagement = () => {
//   const { user } = useAuth();
//   const router = useRouter();
  
//   const [orgChart, setOrgChart] = useState<any>(null);

//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [role, setRole] = useState('');

//   useEffect(() => {
//     if (user?.role !== 'General Manager') {
//       router.push('/unauthorized'); // Redirect to an unauthorized page
//     }
//   }, [user, router]);

//   if (user?.role !== 'General Manager') {
//     return null; // Optionally, render nothing until the redirect happens
//   }

//   const handleAddUser = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const response = await fetch('/api/assign-role', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ username, password, role }),
//     });

//     if (response.ok) {
//       alert('User added successfully!');
//       setUsername('');
//       setPassword('');
//       setRole('');
//     } else {
//       alert('Failed to add user.');
//     }
//   };

//   // Hierarchy data for the user roles
//   // const orgChart = {
//   //   name: 'General Manager',
//   //   children: [
//   //     {
//   //       name: 'Head of Sales',
//   //       children: [
//   //         {
//   //           name: 'Sales Operation',
//   //           children: [
//   //             {
//   //               name: 'Team Leader 1',
//   //               children: [{ name: 'Sales' }],
//   //             },
//   //             {
//   //               name: 'Team Leader 2',
//   //               children: [{ name: 'Sales' }],
//   //             },
//   //           ],
//   //         },
//   //       ],
//   //     },
//   //   ],
//   // };
//   const fetchOrgChart = async () => {
//     // Fetch users from the database and construct the org chart
//     const response = await fetch('/api/get-org-chart');
//     const data = await response.json();
//     const orgChart = {
//       name: 'General Manager',
//       children: [
//         {
//           name: 'Head of Sales',
//           children: data.headOfSales.map((salesOp: User) => ({
//             name: salesOp.username,
//             children: data.salesOperations.map((op: User) => ({
//               name: op.username,
//               children: data.teamLeaders.map((leader: User) => ({
//                 name: leader.username,
//                 children: data.sales.map((sales: User) => ({
//                   name: sales.username,
//                 })),
//               })),
//             })),
//           })),
//         },
//       ],
//     };

//     setOrgChart(orgChart);
//   };

//   const renderCustomNode = ({ nodeDatum }: { nodeDatum: any }) => (
//     <g>
//       <circle r={15} fill="#555" />
//       <text fill="#fff" x="20">
//         {nodeDatum.name}
//       </text>
//     </g>
//   );

//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         justifyContent: 'center',
//         minHeight: '100vh',
//         padding: '20px',
//         backgroundColor: '#f0f0f0',
//       }}
//     >
//       <Box
//         sx={{
//           backgroundColor: '#ffffff',
//           padding: '24px',
//           borderRadius: '8px',
//           boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
//           maxWidth: '500px',
//           width: '100%',
//         }}
//       >
//         <Typography variant="h4" component="h1" gutterBottom textAlign="center">
//           User Management
//         </Typography>

//         <Box
//           component="form"
//           onSubmit={handleAddUser}
//           sx={{
//             display: 'flex',
//             flexDirection: 'column',
//             gap: '16px',
//             marginBottom: '24px',
//           }}
//         >
//           <Typography variant="h6" gutterBottom>
//             Add New User
//           </Typography>
//           <TextField
//             label="Username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             fullWidth
//             required
//           />
//           <TextField
//             label="Password"
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             fullWidth
//             required
//           />
//           <TextField
//             label="Role"
//             select
//             value={role}
//             onChange={(e) => setRole(e.target.value)}
//             fullWidth
//             required
//           >
//             <MenuItem value="General Manager">General Manager</MenuItem>
//             <MenuItem value="Head of Sales">Head of Sales</MenuItem>
//             <MenuItem value="Sales Operation">Sales Operation</MenuItem>
//             <MenuItem value="Sales Team Leader">Sales Team Leader</MenuItem>
//             <MenuItem value="Sales">Sales</MenuItem>
//           </TextField>
//           <Button type="submit" variant="contained" color="success">
//             Add User
//           </Button>
//         </Box>

//         <Typography variant="h5" component="h2" gutterBottom textAlign="center">
//           User Hierarchy
//         </Typography>
//         <Box sx={{ height: '300px' }}>
//           <Tree
//             data={orgChart}
//             orientation="vertical"
//             translate={{ x: 150, y: 50 }}
//             zoomable={false}
//             collapsible={false}
//             renderCustomNodeElement={renderCustomNode}
//           />
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default UserManagement;



// //////////////////////////////////




















// // pages/dashboard/user-management.tsx

// "use client";

// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { useAuth } from '../../contexts/AuthContext';
// import { Box, Button, TextField, Typography, MenuItem } from '@mui/material';
// import Tree from 'react-d3-tree';

// interface User {
//   username: string;
//   role: string;
// }

// const UserManagement = () => {
//   const { user } = useAuth();
//   const router = useRouter();
//   const [orgChart, setOrgChart] = useState<any>(null);
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [role, setRole] = useState('');

//   useEffect(() => {
//     if (user?.role !== 'General Manager') {
//       router.push('/unauthorized'); // Redirect to an unauthorized page
//     } else {
//       fetchOrgChart(); // Fetch the org chart data
//     }
//   }, [user, router]);

//   const handleAddUser = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const response = await fetch('/api/assign-role', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ username, password, role }),
//     });

//     if (response.ok) {
//       alert('User added successfully!');
//       setUsername('');
//       setPassword('');
//       setRole('');
//       fetchOrgChart(); // Refresh the org chart after adding a user
//     } else {
//       alert('Failed to add user.');
//     }
//   };

//   const fetchOrgChart = async () => {
//     const response = await fetch('/api/get-org-chart');
//     const data = await response.json();

//     const orgChart = {
//       name: 'General Manager',
//       children: [
//         {
//           name: 'Head of Sales',
//           children: data.headOfSales.map((salesOp: User) => ({
//             name: salesOp.username,
//             children: data.salesOperations.map((op: User) => ({
//               name: op.username,
//               children: data.teamLeaders.map((leader: User) => ({
//                 name: leader.username,
//                 children: data.sales.map((sales: User) => ({
//                   name: sales.username,
//                 })),
//               })),
//             })),
//           })),
//         },
//       ],
//     };

//     setOrgChart(orgChart);
//   };

//   const renderCustomNode = ({ nodeDatum }: { nodeDatum: any }) => (
//     <g>
//       <circle r={15} fill="#555" />
//       <text fill="#2D3748" x="20"> {/* slate-700 color */}
//         {nodeDatum.name}
//       </text>
//     </g>
//   );

//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         justifyContent: 'center',
//         minHeight: '100vh',
//         padding: '20px',
//         backgroundColor: '#f0f0f0',
//       }}
//     >
//       <Box
//         sx={{
//           backgroundColor: '#ffffff',
//           padding: '24px',
//           borderRadius: '8px',
//           boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
//           maxWidth: '500px',
//           width: '100%',
//         }}
//       >
//         <Typography variant="h4" component="h1" gutterBottom textAlign="center" className='text-slate-700'>
//           User Management
//         </Typography>

//         <Box
//           component="form"
//           onSubmit={handleAddUser}
//           sx={{
//             display: 'flex',
//             flexDirection: 'column',
//             gap: '16px',
//             marginBottom: '24px',
//           }}
//         >
//           <Typography variant="h6" gutterBottom>
//             Add New User
//           </Typography>
//           <TextField
//             label="Username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             fullWidth
//             required
//           />
//           <TextField
//             label="Password"
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             fullWidth
//             required
//           />
//           <TextField
//             label="Role"
//             select
//             value={role}
//             onChange={(e) => setRole(e.target.value)}
//             fullWidth
//             required
//           >
//             <MenuItem value="General Manager">General Manager</MenuItem>
//             <MenuItem value="Head of Sales">Head of Sales</MenuItem>
//             <MenuItem value="Sales Operation">Sales Operation</MenuItem>
//             <MenuItem value="Sales Team Leader">Sales Team Leader</MenuItem>
//             <MenuItem value="Sales">Sales</MenuItem>
//           </TextField>
//           <Button type="submit" variant="contained" color="success">
//             Add User
//           </Button>
//         </Box>

//         <Typography variant="h5" component="h2" gutterBottom textAlign="center" className='text-slate-700'>
//           User Hierarchy
//         </Typography>
//         <Box sx={{ height: '300px' }}>
//           {orgChart ? (
//             <Tree
//               data={orgChart}
//               orientation="vertical"
//               translate={{ x: 150, y: 50 }}
//               zoomable={false}
//               collapsible={false}
//               renderCustomNodeElement={renderCustomNode}
//             />
//           ) : (
//             <Typography variant="body1" textAlign="center" className='text-slate-700'>Loading...</Typography>
//           )}
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default UserManagement;

































// "use client";

// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { useAuth } from '../../contexts/AuthContext';
// import { Box, Button, TextField, Typography, MenuItem } from '@mui/material';
// import Tree from 'react-d3-tree';

// interface User {
//   username: string;
//   role: string;
// }

// const UserManagement = () => {
//   const { user } = useAuth();
//   const router = useRouter();

//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [role, setRole] = useState('');
//   const [orgChart, setOrgChart] = useState<any>(null);

//   useEffect(() => {
//     if (user?.role !== 'General Manager') {
//       router.push('/unauthorized');
//     } else {
//       fetchOrgChart();
//     }
//   }, [user, router]);

//   const fetchOrgChart = async () => {
//     try {
//       const response = await fetch('/api/get-org-chart');
//       const data = await response.json();

//       const orgChart = {
//         name: 'General Managers',
//         children: data.generalManagers.map((gm: User) => ({
//           name: gm.username,
//           attributes: { role: 'General Manager' }, // Adding role as an attribute for styling
//           children: [
//             {
//               name: 'Head of Sales',
//               attributes: { role: 'Head of Sales' },
//               children: data.headOfSales.map((hos: User) => ({
//                 name: hos.username,
//                 attributes: { role: 'Head of Sales' },
//                 children: [
//                   {
//                     name: 'Sales Operations',
//                     attributes: { role: 'Sales Operations' },
//                     children: [
//                       ...data.salesOperations.filter((so: User) => so.username === 'fatma').map((so: User) => ({
//                         name: so.username,
//                         attributes: { role: 'Sales Operations' },
//                         children: data.sales.filter((s: User) => s.username === 'esraa').map((s: User) => ({
//                           name: s.username,
//                           attributes: { role: 'Sales' },
//                         })),
//                       })),
//                       {
//                         name: 'Team Leader: Nour',
//                         attributes: { role: 'Team Leader' },
//                         children: data.sales.filter((s: User) => s.username === 'alaa').map((s: User) => ({
//                           name: s.username,
//                           attributes: { role: 'Sales' },
//                         })),
//                       },
//                       {
//                         name: 'Team Leader: Mahmad',
//                         attributes: { role: 'Team Leader' },
//                         children: data.sales.filter((s: User) => s.username === 'ziad').map((s: User) => ({
//                           name: s.username,
//                           attributes: { role: 'Sales' },
//                         })),
//                       },
//                     ],
//                   },
//                 ],
//               })),
//             },
//           ],
//         })),
//       };

//       setOrgChart(orgChart);
//     } catch (error) {
//       console.error('Failed to fetch org chart:', error);
//     }
//   };
  

//   const handleAddUser = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const response = await fetch('/api/assign-role', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ username, password, role }),
//     });

//     if (response.ok) {
//       alert('User added successfully!');
//       setUsername('');
//       setPassword('');
//       setRole('');
//       fetchOrgChart();
//     } else {
//       alert('Failed to add user.');
//     }
//   };

//   const renderCustomNode = ({ nodeDatum }: { nodeDatum: any }) => (
//     <g>
//       <circle r={15} fill={getNodeColor(nodeDatum.attributes?.role)} />
//       <text className='italic font-sans-serif' fontSize={20} x="25" dy=".35em">
//         {nodeDatum.name}
//       </text>
//       <text fill={getNodeColor(nodeDatum.attributes?.role)} className='italic font-sans-serif' fontSize={20} x="20" y="20">
//       </text>
//     </g>
//   );
  
//   const getNodeColor = (role: string) => {
//     switch (role) {
//       case 'General Manager':
//         return '#FF4500';
//       case 'Head of Sales':
//         return '#1E90FF';
//       case 'Sales Operations':
//         return '#32CD32';
//       case 'Team Leader':
//         return '#FFD700';
//       case 'Sales':
//         return '#FF69B4';
//       default:
//         return '#000000';
//     }
//   };

  
//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         justifyContent: 'center',
//         minHeight: '100vh',
//         padding: '20px',
//         backgroundColor: '#E5E7EB',
//       }}
//     >
//       <Box
//         sx={{
//           backgroundColor: '#FFFFFF',
//           padding: '24px',
//           borderRadius: '8px',
//           boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
//           maxWidth: '800px',
//           width: '100%',
//         }}
//       >
//         <Typography variant="h4" component="h1" gutterBottom textAlign="center" className='text-blue-800'>
//           User Management
//         </Typography>
  
//         <Box
//           component="form"
//           onSubmit={handleAddUser}
//           sx={{
//             display: 'flex',
//             flexDirection: 'column',
//             gap: '16px',
//             marginBottom: '24px',
//           }}
//         >
//           <Typography variant="h6" gutterBottom className='text-blue-800'>
//             Add New User
//           </Typography>
//           <TextField
//             label="Username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             fullWidth
//             required
//           />
//           <TextField
//             label="Password"
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             fullWidth
//             required
//           />
//           <TextField
//             label="Role"
//             select
//             value={role}
//             onChange={(e) => setRole(e.target.value)}
//             fullWidth
//             required
//           >
//             <MenuItem value="General Manager">General Manager</MenuItem>
//             <MenuItem value="Head of Sales">Head of Sales</MenuItem>
//             <MenuItem value="Sales Operation">Sales Operation</MenuItem>
//             <MenuItem value="Sales Team Leader">Sales Team Leader</MenuItem>
//             <MenuItem value="Sales">Sales</MenuItem>
//           </TextField>
//           <Button type="submit" variant="contained" color="primary">
//             Add User
//           </Button>
//         </Box>
  
//         <Typography variant="h5" component="h2" gutterBottom textAlign="center" className='text-blue-800'>
//           User Hierarchy
//         </Typography>
//         <Box sx={{ height: '400px' }}>
//           {orgChart && (
//             <Tree
//               data={orgChart}
//               orientation="vertical"
//               translate={{ x: 400, y: 50 }}
//               zoomable={false}
//               collapsible={false}
//               renderCustomNodeElement={renderCustomNode}
//             />
//           )}
//         </Box>
//       </Box>
//     </Box>
//   );
  
// };

// export default UserManagement;










// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { Box, Button, TextField, Typography, MenuItem } from '@mui/material';

// interface UserNode {
//   id: string;
//   name: string;
//   role: string;
//   children?: UserNode[];
// }

// const UserManagement = () => {
//   const [treeData, setTreeData] = useState<UserNode[]>([]);
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [role, setRole] = useState('');
//   const [parentId, setParentId] = useState<string | null>(null);
//   const router = useRouter();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch('/api/get-org-chart');
//         const data = await response.json();
//         console.log('API Response:', data); // Check the response structure
//         setTreeData(data);
//       } catch (error) {
//         console.error('Failed to fetch org chart:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleAddUser = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       const response = await fetch('/api/assign-role', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ username, password, role, parentId }),
//       });

//       if (response.ok) {
//         alert('User added successfully!');
//         setUsername('');
//         setPassword('');
//         setRole('');
//         setParentId(null);
//         const fetchData = async () => {
//           const response = await fetch('/api/get-org-chart');
//           const data = await response.json();
//           setTreeData(data);
//         };
//         fetchData(); // Refresh tree after adding user
//       } else {
//         alert('Failed to add user.');
//       }
//     } catch (error) {
//       console.error('Error adding user:', error);
//       alert('Failed to add user.');
//     }
//   };

//   const handleDeleteUser = async (userId: string) => {
//     try {
//       const response = await fetch('/api/delete-user', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ userId }),
//       });

//       if (response.ok) {
//         alert('User deleted successfully!');
//         const fetchData = async () => {
//           const response = await fetch('/api/get-org-chart');
//           const data = await response.json();
//           setTreeData(data);
//         };
//         fetchData(); // Refresh tree after deleting user
//       } else {
//         alert('Failed to delete user.');
//       }
//     } catch (error) {
//       console.error('Error deleting user:', error);
//       alert('Failed to delete user.');
//     }
//   };

//   const renderTree = (nodes: UserNode[]) => {
//     if (!Array.isArray(nodes)) {
//       return null;
//     }
//     return (
//       <ul>
//         {nodes.map((node) => (
//           <li key={node.id}>
//             <span style={{ cursor: 'pointer', color: 'blue' }}>
//               {node.name} ({node.role})
//             </span>
//             <Button onClick={() => handleDeleteUser(node.id)}>Delete</Button>
//             {node.children && renderTree(node.children)}
//           </li>
//         ))}
//       </ul>
//     );
//   };

//   return (
//     <Box sx={{ padding: '20px' }}>
//       <Typography variant="h4" component="h1" gutterBottom>
//         User Management
//       </Typography>
//       <Box component="form" onSubmit={handleAddUser} sx={{ marginBottom: '20px' }}>
//         <TextField
//           label="Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           fullWidth
//           required
//         />
//         <TextField
//           label="Password"
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           fullWidth
//           required
//         />
//         <TextField
//           label="Role"
//           select
//           value={role}
//           onChange={(e) => setRole(e.target.value)}
//           fullWidth
//           required
//         >
//           <MenuItem value="General Manager">General Manager</MenuItem>
//           <MenuItem value="Head of Sales">Head of Sales</MenuItem>
//           <MenuItem value="Sales Operations">Sales Operations</MenuItem>
//           <MenuItem value="Team Leader">Team Leader</MenuItem>
//           <MenuItem value="Sales">Sales</MenuItem>
//         </TextField>
//         <Button type="submit" variant="contained" color="primary">
//           Add User
//         </Button>
//       </Box>
//       <Typography variant="h5" component="h2" gutterBottom>
//         Organization Hierarchy
//       </Typography>
//       {renderTree(treeData)}
//     </Box>
//   );
// };

// export default UserManagement;










// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import {
//   Box,
//   Button,
//   TextField,
//   Typography,
//   MenuItem,
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
//   IconButton,
// } from '@mui/material';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import DeleteIcon from '@mui/icons-material/Delete';

// interface UserNode {
//   id: string;
//   name: string;
//   role: string;
//   children?: UserNode[];
// }

// const UserManagement = () => {
//   const [treeData, setTreeData] = useState<UserNode[]>([]);
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [role, setRole] = useState('');
//   const [parentId, setParentId] = useState<string | null>(null);
//   const router = useRouter();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch('/api/get-org-chart');
//         const data = await response.json();
//         console.log('API Response:', data);
//         setTreeData(data);
//       } catch (error) {
//         console.error('Failed to fetch org chart:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleAddUser = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       const response = await fetch('/api/assign-role', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ username, password, role, parentId }),
//       });

//       if (response.ok) {
//         alert('User added successfully!');
//         setUsername('');
//         setPassword('');
//         setRole('');
//         setParentId(null);
//         const fetchData = async () => {
//           const response = await fetch('/api/get-org-chart');
//           const data = await response.json();
//           setTreeData(data);
//         };
//         fetchData();
//       } else {
//         alert('Failed to add user.');
//       }
//     } catch (error) {
//       console.error('Error adding user:', error);
//       alert('Failed to add user.');
//     }
//   };

//   const handleDeleteUser = async (userId: string) => {
//     try {
//       const response = await fetch('/api/delete-user', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ userId }),
//       });

//       if (response.ok) {
//         alert('User deleted successfully!');
//         const fetchData = async () => {
//           const response = await fetch('/api/get-org-chart');
//           const data = await response.json();
//           setTreeData(data);
//         };
//         fetchData();
//       } else {
//         alert('Failed to delete user.');
//       }
//     } catch (error) {
//       console.error('Error deleting user:', error);
//       alert('Failed to delete user.');
//     }
//   };

//   // const renderTree = (nodes: UserNode[]) => {
//   //   if (!Array.isArray(nodes)) {
//   //     return null;
//   //   }
//   //   return (
//   //     <Box sx={{ marginLeft: 2 }}>
//   //       {nodes.map((node) => (
//   //         <Accordion key={node.id} sx={{ marginBottom: 1 }}>
//   //           <AccordionSummary
//   //             expandIcon={<ExpandMoreIcon />}
//   //             aria-controls={`panel-${node.id}-content`}
//   //             id={`panel-${node.id}-header`}
//   //           >
//   //             <Typography variant="body1">
//   //               {node.name} ({node.role})
//   //             </Typography>
//   //             <IconButton
//   //               aria-label="delete"
//   //               size="small"
//   //               onClick={() => handleDeleteUser(node.id)}
//   //               sx={{ marginLeft: 'auto' }}
//   //             >
//   //               <DeleteIcon fontSize="small" />
//   //             </IconButton>
//   //           </AccordionSummary>
//   //           <AccordionDetails>{node.children && renderTree(node.children)}</AccordionDetails>
//   //         </Accordion>
//   //       ))}
//   //     </Box>
//   //   );
//   // };


//   const renderTree = (nodes: UserNode[]) => {
//     if (!Array.isArray(nodes)) {
//       return null;
//     }
//     return (
//       <Box sx={{ marginLeft: 2 }}>
//         {nodes.map((node) => (
//           <Accordion key={node.id} sx={{ marginBottom: 1 }}>
//             <AccordionSummary
//               expandIcon={<ExpandMoreIcon />}
//               aria-controls={`panel-${node.id}-content`}
//               id={`panel-${node.id}-header`}
//             >
//               <Typography variant="body1">
//                 {node.role}: {node.name}
//               </Typography>
//               <IconButton
//                 aria-label="delete"
//                 size="small"
//                 onClick={() => handleDeleteUser(node.id)}
//                 sx={{ marginLeft: 'auto' }}
//               >
//                 <DeleteIcon fontSize="small" />
//               </IconButton>
//             </AccordionSummary>
//             <AccordionDetails>
//               <Typography variant="body2" sx={{ marginLeft: 2, fontStyle: 'italic' }}>
//                 {node.children && node.children.length > 0 ? 'Subordinates:' : 'No subordinates'}
//               </Typography>
//               {node.children && renderTree(node.children)}
//             </AccordionDetails>
//           </Accordion>
//         ))}
//       </Box>
//     );
//   };
  

//   return (
//     <Box sx={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
//       <Typography variant="h4" component="h1" gutterBottom textAlign="center">
//         User Management
//       </Typography>
//       <Box
//         component="form"
//         onSubmit={handleAddUser}
//         sx={{
//           marginBottom: '20px',
//           display: 'flex',
//           flexDirection: 'column',
//           gap: '16px',
//           backgroundColor: '#f7f7f7',
//           padding: '20px',
//           borderRadius: '8px',
//           boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
//         }}
//       >
//         <TextField
//           label="Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           fullWidth
//           required
//         />
//         <TextField
//           label="Password"
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           fullWidth
//           required
//         />
//         <TextField
//           label="Role"
//           select
//           value={role}
//           onChange={(e) => setRole(e.target.value)}
//           fullWidth
//           required
//         >
//           <MenuItem value="General Manager">General Manager</MenuItem>
//           <MenuItem value="Head of Sales">Head of Sales</MenuItem>
//           <MenuItem value="Sales Operations">Sales Operations</MenuItem>
//           <MenuItem value="Team Leader">Team Leader</MenuItem>
//           <MenuItem value="Sales">Sales</MenuItem>
//         </TextField>
//         <Button type="submit" variant="contained" color="primary">
//           Add User
//         </Button>
//       </Box>
//       <Typography variant="h5" component="h2" gutterBottom textAlign="center">
//         Organization Hierarchy
//       </Typography>
//       <Box sx={{ marginTop: 2 }}>
//         {treeData.length > 0 ? renderTree(treeData) : <Typography>No data available</Typography>}
//       </Box>
//     </Box>
//   );
// };

// export default UserManagement;








// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import {
//   Box,
//   Button,
//   TextField,
//   Typography,
//   MenuItem,
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
//   IconButton,
// } from '@mui/material';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import DeleteIcon from '@mui/icons-material/Delete';

// interface UserNode {
//   id: string;
//   name: string;
//   role: string;
//   children?: UserNode[];
// }

// const UserManagement = () => {
//   const [treeData, setTreeData] = useState<UserNode[]>([]);
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [role, setRole] = useState('');
//   const [parentId, setParentId] = useState<string | null>(null);
//   const router = useRouter();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch('/api/get-org-chart');
//         const data = await response.json();
//         console.log('API Response:', data);
//         setTreeData(data);
//       } catch (error) {
//         console.error('Failed to fetch org chart:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleAddUser = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       const response = await fetch('/api/assign-role', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ username, password, role, parentId }),
//       });

//       if (response.ok) {
//         alert('User added successfully!');
//         setUsername('');
//         setPassword('');
//         setRole('');
//         setParentId(null);
//         const fetchData = async () => {
//           const response = await fetch('/api/get-org-chart');
//           const data = await response.json();
//           setTreeData(data);
//         };
//         fetchData();
//       } else {
//         alert('Failed to add user.');
//       }
//     } catch (error) {
//       console.error('Error adding user:', error);
//       alert('Failed to add user.');
//     }
//   };

//   const handleDeleteUser = async (userId: string) => {
//     try {
//       const response = await fetch('/api/delete-user', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ userId }),
//       });

//       if (response.ok) {
//         alert('User deleted successfully!');
//         const fetchData = async () => {
//           const response = await fetch('/api/get-org-chart');
//           const data = await response.json();
//           setTreeData(data);
//         };
//         fetchData();
//       } else {
//         alert('Failed to delete user.');
//       }
//     } catch (error) {
//       console.error('Error deleting user:', error);
//       alert('Failed to delete user.');
//     }
//   };

//   const renderTree = (nodes: UserNode[]) => {
//     if (!Array.isArray(nodes)) {
//       return null;
//     }
//     return (
//       <Box sx={{ marginLeft: 2 }}>
//         {nodes.map((node) => (
//           <Accordion key={node.id} sx={{ marginBottom: 1 }}>
//             <AccordionSummary
//               expandIcon={<ExpandMoreIcon />}
//               aria-controls={`panel-${node.id}-content`}
//               id={`panel-${node.id}-header`}
//             >
//               <Typography variant="body1">
//                 {node.role}: {node.name}
//               </Typography>
//               <IconButton
//                 aria-label="delete"
//                 size="small"
//                 onClick={() => handleDeleteUser(node.id)}
//                 sx={{ marginLeft: 'auto' }}
//               >
//                 <DeleteIcon fontSize="small" />
//               </IconButton>
//             </AccordionSummary>
//             <AccordionDetails>
//               {node.children && node.children.length > 0 ? (
//                 <>
//                   <Typography variant="body2" sx={{ marginLeft: 2, fontStyle: 'italic' }}>
//                     Subordinates:
//                   </Typography>
//                   {renderTree(node.children)}
//                 </>
//               ) : (
//                 <Typography variant="body2" sx={{ marginLeft: 2, fontStyle: 'italic' }}>
//                   No subordinates
//                 </Typography>
//               )}
//             </AccordionDetails>
//           </Accordion>
//         ))}
//       </Box>
//     );
//   };

//   return (
//     <Box sx={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
//       <Typography variant="h4" component="h1" gutterBottom textAlign="center">
//         User Management
//       </Typography>
//       <Box
//         component="form"
//         onSubmit={handleAddUser}
//         sx={{
//           marginBottom: '20px',
//           display: 'flex',
//           flexDirection: 'column',
//           gap: '16px',
//           backgroundColor: '#f7f7f7',
//           padding: '20px',
//           borderRadius: '8px',
//           boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
//         }}
//       >
//         <TextField
//           label="Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           fullWidth
//           required
//         />
//         <TextField
//           label="Password"
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           fullWidth
//           required
//         />
//         <TextField
//           label="Role"
//           select
//           value={role}
//           onChange={(e) => setRole(e.target.value)}
//           fullWidth
//           required
//         >
//           <MenuItem value="General Manager">General Manager</MenuItem>
//           <MenuItem value="Head of Sales">Head of Sales</MenuItem>
//           <MenuItem value="Sales Operations">Sales Operations</MenuItem>
//           <MenuItem value="Team Leader">Team Leader</MenuItem>
//           <MenuItem value="Sales">Sales</MenuItem>
//         </TextField>
//         <Button type="submit" variant="contained" color="primary">
//           Add User
//         </Button>
//       </Box>
//       <Typography variant="h5" component="h2" gutterBottom textAlign="center">
//         Organization Hierarchy
//       </Typography>
//       <Box sx={{ marginTop: 2 }}>
//         {treeData.length > 0 ? renderTree(treeData) : <Typography>No data available</Typography>}
//       </Box>
//     </Box>
//   );
// };

// export default UserManagement;









// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import {
//   Box,
//   Button,
//   TextField,
//   Typography,
//   MenuItem,
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
//   IconButton,
//   InputAdornment,
// } from '@mui/material';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import DeleteIcon from '@mui/icons-material/Delete';
// import Visibility from '@mui/icons-material/Visibility';
// import VisibilityOff from '@mui/icons-material/VisibilityOff';

// interface UserNode {
//   id: string;
//   name: string;
//   role: string;
//   children?: UserNode[];
// }

// const UserManagement = () => {
//   const [treeData, setTreeData] = useState<UserNode[]>([]);
//   const [users, setUsers] = useState<UserNode[]>([]);
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [role, setRole] = useState('');
//   const [parentId, setParentId] = useState<string | null>(null);
//   const [showPassword, setShowPassword] = useState(false);
//   const router = useRouter();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch('/api/get-org-chart');
//         const data = await response.json();
//         console.log('API Response:', data);
//         setTreeData(data);
//         setUsers(data);  // Populate the users dropdown
//       } catch (error) {
//         console.error('Failed to fetch org chart:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleAddUser = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       const response = await fetch('/api/assign-role', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ username, password, role, parentId }),
//       });

//       if (response.ok) {
//         alert('User added successfully!');
//         setUsername('');
//         setPassword('');
//         setRole('');
//         setParentId(null);
//         const fetchData = async () => {
//           const response = await fetch('/api/get-org-chart');
//           const data = await response.json();
//           setTreeData(data);
//         };
//         fetchData();
//       } else {
//         alert('Failed to add user.');
//       }
//     } catch (error) {
//       console.error('Error adding user:', error);
//       alert('Failed to add user.');
//     }
//   };

//   const handleDeleteUser = async (userId: string) => {
//     try {
//       const response = await fetch('/api/delete-user', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ userId }),
//       });

//       if (response.ok) {
//         alert('User deleted successfully!');
//         const fetchData = async () => {
//           const response = await fetch('/api/get-org-chart');
//           const data = await response.json();
//           setTreeData(data);
//         };
//         fetchData();
//       } else {
//         alert('Failed to delete user.');
//       }
//     } catch (error) {
//       console.error('Error deleting user:', error);
//       alert('Failed to delete user.');
//     }
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const renderTree = (nodes: UserNode[]) => {
//     if (!Array.isArray(nodes)) {
//       return null;
//     }
//     return (
//       <Box sx={{ marginLeft: 2 }}>
//         {nodes.map((node) => (
//           <Accordion key={node.id} sx={{ marginBottom: 1 }}>
//             <AccordionSummary
//               expandIcon={<ExpandMoreIcon />}
//               aria-controls={`panel-${node.id}-content`}
//               id={`panel-${node.id}-header`}
//             >
//               <Typography variant="body1">
//                 {node.role}: {node.name}
//               </Typography>
//               <IconButton
//                 aria-label="delete"
//                 size="small"
//                 onClick={() => handleDeleteUser(node.id)}
//                 sx={{ marginLeft: 'auto' }}
//               >
//                 <DeleteIcon fontSize="small" />
//               </IconButton>
//             </AccordionSummary>
//             <AccordionDetails>
//               {node.children && node.children.length > 0 ? (
//                 <>
//                   <Typography variant="body2" sx={{ marginLeft: 2, fontStyle: 'italic' }}>
//                     Subordinates:
//                   </Typography>
//                   {renderTree(node.children)}
//                 </>
//               ) : (
//                 <Typography variant="body2" sx={{ marginLeft: 2, fontStyle: 'italic' }}>
//                   No subordinates
//                 </Typography>
//               )}
//             </AccordionDetails>
//           </Accordion>
//         ))}
//       </Box>
//     );
//   };

//   return (
//     <Box sx={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
//       <Typography variant="h4" component="h1" gutterBottom textAlign="center">
//         User Management
//       </Typography>
//       <Box
//         component="form"
//         onSubmit={handleAddUser}
//         sx={{
//           marginBottom: '20px',
//           display: 'flex',
//           flexDirection: 'column',
//           gap: '16px',
//           backgroundColor: '#f7f7f7',
//           padding: '20px',
//           borderRadius: '8px',
//           boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
//         }}
//       >
//         <TextField
//           label="Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           fullWidth
//           required
//         />
//       <TextField
//         label="Password"
//         type={showPassword ? 'text' : 'password'} // Visible by default
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         fullWidth
//         required
//         InputProps={{
//           endAdornment: (
//             <InputAdornment position="end">
//               <IconButton
//                 onClick={togglePasswordVisibility}
//                 edge="end"
//               >
//                 {showPassword ? <VisibilityOff /> : <Visibility />}
//               </IconButton>
//             </InputAdornment>
//           ),
//         }}
//       />
//         <TextField
//           label="Role"
//           select
//           value={role}
//           onChange={(e) => setRole(e.target.value)}
//           fullWidth
//           required
//         >
//           <MenuItem value="General Manager">General Manager</MenuItem>
//           <MenuItem value="Head of Sales">Head of Sales</MenuItem>
//           <MenuItem value="Sales Operations">Sales Operations</MenuItem>
//           <MenuItem value="Team Leader">Team Leader</MenuItem>
//           <MenuItem value="Sales">Sales</MenuItem>
//         </TextField>


        
//         {/* <TextField
//           select
//           label="Role"
//           value={role}
//           onChange={(e) => setRole(e.target.value)}
//           fullWidth
//           required
//         >
//           <MenuItem value="">None (Top Level)</MenuItem> 
//           <MenuItem value="General Manager">General Manager</MenuItem>
//           <MenuItem value="Head of Sales">Head of Sales</MenuItem>
//           <MenuItem value="Sales Operations">Sales Operations</MenuItem>
//           <MenuItem value="Team Leader">Team Leader</MenuItem>
//           <MenuItem value="Sales">Sales</MenuItem>
//         </TextField> */}

//         <TextField
//           label="Parent User"
//           select
//           value={parentId || ''}
//           onChange={(e) => setParentId(e.target.value)}
//           fullWidth
//         >
//           <MenuItem value="">None (Top Level)</MenuItem>
//           {users.map((user) => (
//             <MenuItem key={user.id} value={user.id}>
//               {user.role}: {user.name}
//             </MenuItem>
//           ))}
//         </TextField>



//         <Button type="submit" variant="contained" color="primary">
//           Add User
//         </Button>
//       </Box>
//       <Typography variant="h5" component="h2" gutterBottom textAlign="center">
//         Organization Hierarchy
//       </Typography>
//       <Box sx={{ marginTop: 2 }}>
//         {treeData.length > 0 ? renderTree(treeData) : <Typography>No data available</Typography>}
//       </Box>
//     </Box>
//   );
// };

// export default UserManagement;













// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import {
//   Box,
//   Button,
//   TextField,
//   Typography,
//   MenuItem,
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
//   IconButton,
//   InputAdornment,
//   Snackbar,
//   Alert
// } from '@mui/material';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import DeleteIcon from '@mui/icons-material/Delete';
// import Visibility from '@mui/icons-material/Visibility';
// import VisibilityOff from '@mui/icons-material/VisibilityOff';

// interface UserNode {
//   id: string;
//   name: string;
//   role: string;
//   children?: UserNode[];
// }

// const UserManagement = () => {
//   const [treeData, setTreeData] = useState<UserNode[]>([]);
//   const [users, setUsers] = useState<UserNode[]>([]);
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [role, setRole] = useState('');
//   const [parentId, setParentId] = useState<string | null>(null);
//   const [showPassword, setShowPassword] = useState(false);
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState('');
//   const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
//   const router = useRouter();


  
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch('/api/get-org-chart');
//         const data = await response.json();
//         console.log('API Response:', data);
//         setTreeData(data);
//         setUsers(data);  // Populate the users dropdown
//       } catch (error) {
//         console.error('Failed to fetch org chart:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleAddUser = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       const response = await fetch('/api/assign-role', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ username, password, role, parentId }),
//       });

//       if (response.ok) {
//         setSnackbarMessage('User added successfully!');
//         setSnackbarSeverity('success');
//         setSnackbarOpen(true);
//         setUsername('');
//         setPassword('');
//         setRole('');
//         setParentId(null);
//         const fetchData = async () => {
//           const response = await fetch('/api/get-org-chart');
//           const data = await response.json();
//           setTreeData(data);
//         };
//         fetchData();
//       } else {
//         setSnackbarMessage('Failed to add user.');
//         setSnackbarSeverity('error');
//         setSnackbarOpen(true);
//       }
//     } catch (error) {
//       console.error('Error adding user:', error);
//       setSnackbarMessage('Failed to add user.');
//       setSnackbarSeverity('error');
//       setSnackbarOpen(true);
//     }
//   };

//   const handleDeleteUser = async (userId: string) => {
//     try {
//       const response = await fetch('/api/delete-user', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ userId }),
//       });

//       if (response.ok) {
//         setSnackbarMessage('User deleted successfully!');
//         setSnackbarSeverity('success');
//         setSnackbarOpen(true);
//         const fetchData = async () => {
//           const response = await fetch('/api/get-org-chart');
//           const data = await response.json();
//           setTreeData(data);
//         };
//         fetchData();
//       } else {
//         setSnackbarMessage('Failed to delete user.');
//         setSnackbarSeverity('error');
//         setSnackbarOpen(true);
//       }
//     } catch (error) {
//       console.error('Error deleting user:', error);
//       setSnackbarMessage('Failed to delete user.');
//       setSnackbarSeverity('error');
//       setSnackbarOpen(true);
//     }
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const renderTree = (nodes: UserNode[]) => {
//     if (!Array.isArray(nodes)) {
//       return null;
//     }
//     return (
//       <Box sx={{ marginLeft: 2 }}>
//         {nodes.map((node) => (
//           <Accordion key={node.id} sx={{ marginBottom: 1 }}>
//             <AccordionSummary
//               expandIcon={<ExpandMoreIcon />}
//               aria-controls={`panel-${node.id}-content`}
//               id={`panel-${node.id}-header`}
//             >
//               <Typography variant="body1">
//                 {node.role}: {node.name}
//               </Typography>
//               <IconButton
//                 aria-label="delete"
//                 size="small"
//                 onClick={() => handleDeleteUser(node.id)}
//                 sx={{ marginLeft: 'auto' }}
//               >
//                 <DeleteIcon fontSize="small" />
//               </IconButton>
//             </AccordionSummary>
//             <AccordionDetails>
//               {node.children && node.children.length > 0 ? (
//                 <>
//                   <Typography variant="body2" sx={{ marginLeft: 2, fontStyle: 'italic' }}>
//                     Subordinates:
//                   </Typography>
//                   {renderTree(node.children)}
//                 </>
//               ) : (
//                 <Typography variant="body2" sx={{ marginLeft: 2, fontStyle: 'italic' }}>
//                   No subordinates
//                 </Typography>
//               )}
//             </AccordionDetails>
//           </Accordion>
//         ))}
//       </Box>
//     );
//   };

//   return (
//     <Box sx={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
//       <Typography variant="h4" component="h1" gutterBottom textAlign="center">
//         User Management
//       </Typography>
//       <Box
//         component="form"
//         onSubmit={handleAddUser}
//         sx={{
//           marginBottom: '20px',
//           display: 'flex',
//           flexDirection: 'column',
//           gap: '16px',
//           backgroundColor: '#f7f7f7',
//           padding: '20px',
//           borderRadius: '8px',
//           boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
//         }}
//       >
//         <TextField
//           label="Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           fullWidth
//           required
//         />
//         <TextField
//           label="Password"
//           type={showPassword ? 'text' : 'password'} // Visible by default
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           fullWidth
//           required
//           InputProps={{
//             endAdornment: (
//               <InputAdornment position="end">
//                 <IconButton
//                   onClick={togglePasswordVisibility}
//                   edge="end"
//                 >
//                   {showPassword ? <VisibilityOff /> : <Visibility />}
//                 </IconButton>
//               </InputAdornment>
//             ),
//           }}
//         />
//         <TextField
//           label="Role"
//           select
//           value={role}
//           onChange={(e) => setRole(e.target.value)}
//           fullWidth
//           required
//         >
//           <MenuItem value="General Manager">General Manager</MenuItem>
//           <MenuItem value="Head of Sales">Head of Sales</MenuItem>
//           <MenuItem value="Sales Operations">Sales Operations</MenuItem>
//           <MenuItem value="Team Leader">Team Leader</MenuItem>
//           <MenuItem value="Sales">Sales</MenuItem>
//         </TextField>

//         <TextField
//           label="Parent User"
//           select
//           value={parentId || ''}
//           onChange={(e) => setParentId(e.target.value)}
//           fullWidth
//         >
//           <MenuItem value="">None (Top Level)</MenuItem>
//           {users.map((user) => (
//             <MenuItem key={user.id} value={user.id}>
//               {user.role}: {user.name}
//             </MenuItem>
//           ))}
//         </TextField>

//         <Button type="submit" variant="contained" color="primary">
//           Add User
//         </Button>
//       </Box>
//       <Typography variant="h5" component="h2" gutterBottom textAlign="center">
//         Organization Hierarchy
//       </Typography>
//       <Box sx={{ marginTop: 2 }}>
//         {treeData.length > 0 ? renderTree(treeData) : <Typography>No data available</Typography>}
//       </Box>
      
//       {/* Snackbar for success and error messages */}
//       <Snackbar 
//         open={snackbarOpen} 
//         autoHideDuration={3000} 
//         onClose={() => setSnackbarOpen(false)}
//       >
//         <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity}>
//           {snackbarMessage}
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// };

// export default UserManagement;









// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import {
//   Box,
//   Button,
//   TextField,
//   Typography,
//   MenuItem,
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
//   IconButton,
//   InputAdornment,
//   Snackbar,
//   Alert
// } from '@mui/material';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import DeleteIcon from '@mui/icons-material/Delete';
// import Visibility from '@mui/icons-material/Visibility';
// import VisibilityOff from '@mui/icons-material/VisibilityOff';

// interface UserNode {
//   id: string;
//   name: string;
//   role: string;
//   children?: UserNode[];
// }

// const UserManagement = () => {
//   const [treeData, setTreeData] = useState<UserNode[]>([]);
//   const [users, setUsers] = useState<UserNode[]>([]);
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [role, setRole] = useState('');
//   const [parentId, setParentId] = useState<string | null>(null);
//   const [showPassword, setShowPassword] = useState(false);
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState('');
//   const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
//   const router = useRouter();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch('/api/get-org-chart');
//         const data = await response.json();
//         console.log('API Response:', data);
//         setTreeData(data);
//         setUsers(data);  // Populate the users dropdown
//       } catch (error) {
//         console.error('Failed to fetch org chart:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleAddUser = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       const response = await fetch('/api/assign-role', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ username, password, role, parentId }),
//       });

//       if (response.ok) {
//         setSnackbarMessage('User added successfully!');
//         setSnackbarSeverity('success');
//         setSnackbarOpen(true);
//         setUsername('');
//         setPassword('');
//         setRole('');
//         setParentId(null);
//         const fetchData = async () => {
//           const response = await fetch('/api/get-org-chart');
//           const data = await response.json();
//           setTreeData(data);
//         };
//         fetchData();
//       } else {
//         setSnackbarMessage('Failed to add user.');
//         setSnackbarSeverity('error');
//         setSnackbarOpen(true);
//       }
//     } catch (error) {
//       console.error('Error adding user:', error);
//       setSnackbarMessage('Failed to add user.');
//       setSnackbarSeverity('error');
//       setSnackbarOpen(true);
//     }
//   };

//   const handleDeleteUser = async (userId: string) => {
//     try {
//       const response = await fetch('/api/delete-user', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ userId }),
//       });

//       if (response.ok) {
//         setSnackbarMessage('User deleted successfully!');
//         setSnackbarSeverity('success');
//         setSnackbarOpen(true);
//         const fetchData = async () => {
//           const response = await fetch('/api/get-org-chart');
//           const data = await response.json();
//           setTreeData(data);
//         };
//         fetchData();
//       } else {
//         setSnackbarMessage('Failed to delete user.');
//         setSnackbarSeverity('error');
//         setSnackbarOpen(true);
//       }
//     } catch (error) {
//       console.error('Error deleting user:', error);
//       setSnackbarMessage('Failed to delete user.');
//       setSnackbarSeverity('error');
//       setSnackbarOpen(true);
//     }
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const renderTree = (nodes: UserNode[]) => {
//     if (!Array.isArray(nodes)) {
//       return null;
//     }
//     return (
//       <Box sx={{ marginLeft: 2 }}>
//         {nodes.map((node) => (
//           <Accordion key={node.id} sx={{ marginBottom: 1 }}>
//             <AccordionSummary
//               expandIcon={<ExpandMoreIcon />}
//               aria-controls={`panel-${node.id}-content`}
//               id={`panel-${node.id}-header`}
//             >
//               <Typography variant="body1">
//                 {node.role}: {node.name}
//               </Typography>
//               <IconButton
//                 aria-label="delete"
//                 size="small"
//                 onClick={() => handleDeleteUser(node.id)}
//                 sx={{ marginLeft: 'auto' }}
//               >
//                 <DeleteIcon fontSize="small" />
//               </IconButton>
//             </AccordionSummary>
//             <AccordionDetails>
//               {node.children && node.children.length > 0 ? (
//                 <>
//                   <Typography variant="body2" sx={{ marginLeft: 2, fontStyle: 'italic' }}>
//                     Subordinates:
//                   </Typography>
//                   {renderTree(node.children)}
//                 </>
//               ) : (
//                 <Typography variant="body2" sx={{ marginLeft: 2, fontStyle: 'italic' }}>
//                   No subordinates
//                 </Typography>
//               )}
//             </AccordionDetails>
//           </Accordion>
//         ))}
//       </Box>
//     );
//   };

//   return (
//     <Box sx={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
//       <Typography variant="h4" component="h1" gutterBottom textAlign="center">
//         User Management
//       </Typography>
//       <Box
//         component="form"
//         onSubmit={handleAddUser}
//         sx={{
//           marginBottom: '20px',
//           display: 'flex',
//           flexDirection: 'column',
//           gap: '16px',
//           backgroundColor: '#f7f7f7',
//           padding: '20px',
//           borderRadius: '8px',
//           boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
//         }}
//       >
//         <TextField
//           label="Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           fullWidth
//           required
//         />
//         <TextField
//           label="Password"
//           type={showPassword ? 'text' : 'password'} // Visible by default
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           fullWidth
//           required
//           InputProps={{
//             endAdornment: (
//               <InputAdornment position="end">
//                 <IconButton
//                   onClick={togglePasswordVisibility}
//                   edge="end"
//                 >
//                   {showPassword ? <VisibilityOff /> : <Visibility />}
//                 </IconButton>
//               </InputAdornment>
//             ),
//           }}
//         />
//         <TextField
//           label="Role"
//           select
//           value={role}
//           onChange={(e) => setRole(e.target.value)}
//           fullWidth
//           required
//         >
//           <MenuItem value="General Manager">General Manager</MenuItem>
//           <MenuItem value="Head of Sales">Head of Sales</MenuItem>
//           <MenuItem value="Sales Operations">Sales Operations</MenuItem>
//           <MenuItem value="Team Leader">Team Leader</MenuItem>
//           <MenuItem value="Sales">Sales</MenuItem>
//         </TextField>

//         <TextField
//           label="Parent User"
//           select
//           value={parentId || ''}
//           onChange={(e) => setParentId(e.target.value)}
//           fullWidth
//         >
//           <MenuItem value="">None (Top Level)</MenuItem>
//           {users.map((user) => (
//             <MenuItem key={user.id} value={user.id}>
//               {user.role}: {user.name}
//             </MenuItem>
//           ))}
//         </TextField>

//         <Button type="submit" variant="contained" color="primary">
//           Add User
//         </Button>
//       </Box>
//       <Typography variant="h5" component="h2" gutterBottom textAlign="center">
//         Organization Hierarchy
//       </Typography>
//       <Box sx={{ marginTop: 2 }}>
//         {treeData.length > 0 ? renderTree(treeData) : <Typography>No data available</Typography>}
//       </Box>
      
//       {/* Snackbar for success and error messages */}
//       <Snackbar 
//         open={snackbarOpen} 
//         autoHideDuration={3000} 
//         onClose={() => setSnackbarOpen(false)}
//       >
//         <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity}>
//           {snackbarMessage}
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// };

// export default UserManagement;






















































// import React, { useEffect, useState } from 'react';
// import { Box, Button, TextField, Typography, MenuItem, Accordion, AccordionSummary, AccordionDetails, IconButton, InputAdornment, Snackbar, Alert } from '@mui/material';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import DeleteIcon from '@mui/icons-material/Delete';
// import Visibility from '@mui/icons-material/Visibility';
// import VisibilityOff from '@mui/icons-material/VisibilityOff';

// interface UserNode {
//   _id: string;
//   username: string;
//   role: string;
//   children?: UserNode[];
// }

// const UserManagement = () => {
//   const [treeData, setTreeData] = useState<UserNode[]>([]);
//   const [users, setUsers] = useState<UserNode[]>([]);
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [role, setRole] = useState('');
//   const [parentId, setParentId] = useState<string | null>(null);
//   const [showPassword, setShowPassword] = useState(false);
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState('');
//   const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch('/api/get-all-users');  // Use a new endpoint to fetch all users
//         const allUsers = await response.json();
  
//         // Now fetch the org chart separately
//         const parentUsersResponse = await fetch('/api/get-parent-users'); // New endpoint
//         const parentUsers = await parentUsersResponse.json();

//         const chartResponse = await fetch('/api/get-org-chart');
//         const treeData = await chartResponse.json();

//         console.log('API Response:', parentUsers);
//         setTreeData(treeData);
//         setUsers(parentUsers);  // Populate the users dropdown with all users
//       } catch (error) {
//         console.error('Failed to fetch org chart:', error);
//       }
//     };
  
//     fetchData();
//   }, []);

//   console.log("parentId state before submission:", parentId);

//   const handleAddUser = async (e: React.FormEvent) => {
//     e.preventDefault();
  
//     console.log("Submitted parent ID:", parentId);
  
//     try {
//       const response = await fetch('/api/assign-role', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ username, password, role, parentId }),
//       });

  
//       if (response.ok) {
//         setSnackbarMessage('User added successfully!');
//         setSnackbarSeverity('success');
//         setSnackbarOpen(true);
//         setUsername('');
//         setPassword('');
//         setRole('');
//         setParentId(null);
//         const fetchData = async () => {
//           const response = await fetch('/api/get-org-chart');
//           const data = await response.json();
//           setTreeData(data);
//         };
//         fetchData();
//       } else {
//         setSnackbarMessage('Failed to add user.');
//         setSnackbarSeverity('error');
//         setSnackbarOpen(true);
//       }
//     } catch (error) {
//       console.error('Error adding user:', error);
//       setSnackbarMessage('Failed to add user.');
//       setSnackbarSeverity('error');
//       setSnackbarOpen(true);
//     }
//   };
  
//   const handleDeleteUser = async (userId: string) => {
//     console.log('Deleting user with ID:', userId); // This should show the correct ID
//     if (!userId) {
//       console.error('userId is undefined or invalid');
//       return;
//     }
  
//     try {
//       const response = await fetch('/api/delete-user', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ userId }),
//       });
  
//       if (response.ok) {
//         setSnackbarMessage('User deleted successfully!');
//         setSnackbarSeverity('success');
//         setSnackbarOpen(true);
//         const fetchData = async () => {
//           const response = await fetch('/api/get-org-chart');
//           const data = await response.json();
//           setTreeData(data);
//         };
//         fetchData();
//       } else {
//         console.error('Failed to delete user', await response.text());
//         setSnackbarMessage('Failed to delete user.');
//         setSnackbarSeverity('error');
//         setSnackbarOpen(true);
//       }
//     } catch (error) {
//       console.error('Error deleting user:', error);
//       setSnackbarMessage('Failed to delete user.');
//       setSnackbarSeverity('error');
//       setSnackbarOpen(true);
//     }
//   };
  

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const renderTree = (nodes: UserNode[]) => {
//     if (!Array.isArray(nodes)) {
//       return null;
//     }
//     return (
//       <Box sx={{ marginLeft: 2 }}>
//         {nodes.map((node) => (
//           <Accordion key={node._id} sx={{ marginBottom: 1 }}>
//             <AccordionSummary
//               expandIcon={<ExpandMoreIcon />}
//               aria-controls={`panel-${node._id}-content`}
//               id={`panel-${node._id}-header`}
//             >
//               <Typography variant="body1">
//                 {node.role}: {node.username}
//               </Typography>
//               <IconButton
//                 aria-label="delete"
//                 size="small"
//                 onClick={() => {
//                   if (node && node._id) {
//                     const userId = node._id.toString(); // Convert ObjectId to string
//                     console.log('Deleting node with ID:', userId);
//                     handleDeleteUser(userId);
//                   } else {
//                     console.error('node._id is undefined or node is invalid');
//                   }
//                 }}
//                 sx={{ marginLeft: 'auto' }}
//               >
//                 <DeleteIcon fontSize="small" />
//               </IconButton>



//             </AccordionSummary>
//             <AccordionDetails>
//               {node.children && node.children.length > 0 ? (
//                 <>
//                   <Typography variant="body2" sx={{ marginLeft: 2, fontStyle: 'italic' }}>
//                     Sales:
//                   </Typography>
//                   {renderTree(node.children)}
//                 </>
//               ) : (
//                 <Typography variant="body2" sx={{ marginLeft: 2, fontStyle: 'italic' }}>
//                   No Sales 
//                 </Typography>
//               )}
//             </AccordionDetails>
//           </Accordion>
//         ))}
//       </Box>
//     );
//   };

//   return (
//     <Box sx={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
//       <Typography variant="h4" component="h1" gutterBottom textAlign="center">
//         User Management
//       </Typography>
//       <Box
//         component="form"
//         onSubmit={handleAddUser}
//         sx={{
//           marginBottom: '20px',
//           display: 'flex',
//           flexDirection: 'column',
//           gap: '16px',
//           backgroundColor: '#f7f7f7',
//           padding: '20px',
//           borderRadius: '8px',
//           boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
//         }}
//       >
//         <TextField
//           label="Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           fullWidth
//           required
//         />
//         <TextField
//           label="Password"
//           type={showPassword ? 'text' : 'password'}
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           fullWidth
//           required
//           InputProps={{
//             endAdornment: (
//               <InputAdornment position="end">
//                 <IconButton
//                   onClick={togglePasswordVisibility}
//                   edge="end"
//                 >
//                   {showPassword ? <VisibilityOff /> : <Visibility />}
//                 </IconButton>
//               </InputAdornment>
//             ),
//           }}
//         />
//         <TextField
//           label="Role"
//           select
//           value={role}
//           onChange={(e) => setRole(e.target.value)}
//           fullWidth
//           required
//         >
//           <MenuItem value="General Manager">General Manager</MenuItem>
//           <MenuItem value="Head of Sales">Head of Sales</MenuItem>
//           <MenuItem value="Sales Operations">Sales Operations</MenuItem>
//           <MenuItem value="Team Leader">Team Leader</MenuItem>
//           <MenuItem value="Sales">Sales</MenuItem>
//         </TextField>

//         {/* <TextField
//           label="Parent User"
//           select
//           value={parentId || ''}
//           onChange={(e) => setParentId(e.target.value)}
//           fullWidth
//         >
//           <MenuItem value="">None (Top Level)</MenuItem>
//           {users.map((user) => (
//             <MenuItem key={user.id} value={user.id}>
//               {user.role}: {user?.name}
//             </MenuItem>
//           ))}
//         </TextField> */}

// {/* 
//           <TextField
//             label="Parent User"
//             select
//             value={parentId || ''}
//             onChange={(e) => {
//               console.log("Selected parent ID:", e.target.value); // Debugging line
//               setParentId(e.target.value);
//             }}
//             fullWidth
//           >
//             <MenuItem value="" className='text-slate-700'>None (Top Level)</MenuItem>
//             {users.map((user) => (
//               <MenuItem key={user._id} value={user._id} className='text-slate-700'>
//                 {user.username} ({user.role})
//               </MenuItem>
//             ))}
//           </TextField> */}



//           <TextField
//             label="Parent User"
//             select
//             value={parentId || 'none'}
//             onChange={(e) => {
//               const selectedValue = e.target.value;
//               setParentId(selectedValue === 'none' ? null : selectedValue);
//             }}
//             fullWidth
//           >
//             <MenuItem value="none" className='text-slate-700'>None (Top Level)</MenuItem>
//             {users.map((user) => (
//               <MenuItem key={user._id} value={user._id} className='text-slate-700'>
//                 {user.username} ({user.role})
//               </MenuItem>
//             ))}
//           </TextField>




//         <Button type="submit" variant="contained" color="primary">
//           Add User
//         </Button>
//       </Box>
//       <Typography variant="h5" component="h2" gutterBottom textAlign="center">
//         Organization Hierarchy
//       </Typography>
//       <Box sx={{ marginTop: 2 }}>
//         {treeData.length > 0 ? renderTree(treeData) : <Typography>No data available</Typography>}
//       </Box>

//       <Snackbar 
//         open={snackbarOpen} 
//         autoHideDuration={3000} 
//         onClose={() => setSnackbarOpen(false)}
//       >
//         <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity}>
//           {snackbarMessage}
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// };

// export default UserManagement;















// import React, { useEffect, useState } from 'react';
// import {
//   Box,
//   Button,
//   TextField,
//   Typography,
//   MenuItem,
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
//   IconButton,
//   InputAdornment,
//   Snackbar,
//   Alert,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogContentText,
//   DialogTitle
// } from '@mui/material';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import DeleteIcon from '@mui/icons-material/Delete';
// import Visibility from '@mui/icons-material/Visibility';
// import VisibilityOff from '@mui/icons-material/VisibilityOff';

// interface UserNode {
//   _id: string;
//   username: string;
//   role: string;
//   children?: UserNode[];
// }

// const getRoleColor = (role: string) => {
//   switch (role) {
//     case 'General Manager':
//       return '#a7a7a7'; // Light grey
//     case 'Head of Sales':
//       return '#c6c6c6'; // Slightly darker grey
//     case 'Sales Operations':
//       return '#d3d3d3'; // Very light grey
//     case 'Team Leader':
//       return '#f5f5f5'; // Off white
//     case 'Sales':
//       return '#fafafa'; // Almost white
//     default:
//       return '#f0f0f0'; // Default grey
//   }
// };

// const UserManagement = () => {
//   const [treeData, setTreeData] = useState<UserNode[]>([]);
//   const [users, setUsers] = useState<UserNode[]>([]);
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [role, setRole] = useState('');
//   const [parentId, setParentId] = useState<string | null>(null);
//   const [showPassword, setShowPassword] = useState(false);
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState('');
//   const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
//   const [openDialog, setOpenDialog] = useState(false);
//   const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch('/api/get-all-users');  // Use a new endpoint to fetch all users
//         const allUsers = await response.json();

//         // Now fetch the org chart separately
//         const parentUsersResponse = await fetch('/api/get-parent-users'); // New endpoint
//         const parentUsers = await parentUsersResponse.json();

//         const chartResponse = await fetch('/api/get-org-chart');
//         const treeData = await chartResponse.json();

//         console.log('API Response:', parentUsers);
//         setTreeData(treeData);
//         setUsers(parentUsers);  // Populate the users dropdown with all users
//       } catch (error) {
//         console.error('Failed to fetch org chart:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   console.log("parentId state before submission:", parentId);

//   const handleAddUser = async (e: React.FormEvent) => {
//     e.preventDefault();

//     console.log("Submitted parent ID:", parentId);

//     try {
//       const response = await fetch('/api/assign-role', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ username, password, role, parentId }),
//       });

//       if (response.ok) {
//         setSnackbarMessage('User added successfully!');
//         setSnackbarSeverity('success');
//         setSnackbarOpen(true);
//         setUsername('');
//         setPassword('');
//         setRole('');
//         setParentId(null);
//         const fetchData = async () => {
//           const response = await fetch('/api/get-org-chart');
//           const data = await response.json();
//           setTreeData(data);
//         };
//         fetchData();
//       } else {
//         setSnackbarMessage('Failed to add user.');
//         setSnackbarSeverity('error');
//         setSnackbarOpen(true);
//       }
//     } catch (error) {
//       console.error('Error adding user:', error);
//       setSnackbarMessage('Failed to add user.');
//       setSnackbarSeverity('error');
//       setSnackbarOpen(true);
//     }
//   };

//   const handleDeleteUser = async (userId: string) => {
//     console.log('Deleting user with ID:', userId); // This should show the correct ID
//     if (!userId) {
//       console.error('userId is undefined or invalid');
//       return;
//     }

//     try {
//       const response = await fetch('/api/delete-user', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ userId }),
//       });

//       if (response.ok) {
//         setSnackbarMessage('User deleted successfully!');
//         setSnackbarSeverity('success');
//         setSnackbarOpen(true);
//         const fetchData = async () => {
//           const response = await fetch('/api/get-org-chart');
//           const data = await response.json();
//           setTreeData(data);
//         };
//         fetchData();
//       } else {
//         console.error('Failed to delete user', await response.text());
//         setSnackbarMessage('Failed to delete user.');
//         setSnackbarSeverity('error');
//         setSnackbarOpen(true);
//       }
//     } catch (error) {
//       console.error('Error deleting user:', error);
//       setSnackbarMessage('Failed to delete user.');
//       setSnackbarSeverity('error');
//       setSnackbarOpen(true);
//     }
//   };

//   const handleOpenDialog = (userId: string) => {
//     setSelectedUserId(userId);
//     setOpenDialog(true);
//   };

//   const handleCloseDialog = () => {
//     setOpenDialog(false);
//     setSelectedUserId(null);
//   };

//   const handleConfirmDelete = () => {
//     if (selectedUserId) {
//       handleDeleteUser(selectedUserId);
//     }
//     setOpenDialog(false);
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   // const renderTree = (nodes: UserNode[]) => {
//   //   if (!Array.isArray(nodes)) {
//   //     return null;
//   //   }
//   //   return (
//   //     <Box sx={{ marginLeft: 2 }}>
//   //       {nodes.map((node) => (
//   //         <Accordion key={node._id} sx={{ marginBottom: 1, backgroundColor: getRoleColor(node.role) }}>
//   //           <AccordionSummary
//   //             expandIcon={<ExpandMoreIcon />}
//   //             aria-controls={`panel-${node._id}-content`}
//   //             id={`panel-${node._id}-header`}
//   //           >
//   //             <Typography variant="body1">
//   //               {node.role}: {node.username}
//   //             </Typography>
//   //             <IconButton
//   //               aria-label="delete"
//   //               size="small"
//   //               onClick={() => {
//   //                 if (node && node._id) {
//   //                   const userId = node._id.toString(); // Convert ObjectId to string
//   //                   handleOpenDialog(userId); // Open confirmation dialog
//   //                 } else {
//   //                   console.error('node._id is undefined or node is invalid');
//   //                 }
//   //               }}
//   //               sx={{ marginLeft: 'auto' }}
//   //             >
//   //               <DeleteIcon fontSize="small" />
//   //             </IconButton>
//   //           </AccordionSummary>
//   //           <AccordionDetails>
//   //             {node.children && node.children.length > 0 ? (
//   //               <>
//   //                 <Typography variant="body2" sx={{ marginLeft: 2, fontStyle: 'italic' }}>
//   //                   Sales:
//   //                 </Typography>
//   //                 {renderTree(node.children)}
//   //               </>
//   //             ) : (
//   //               <Typography variant="body2" sx={{ marginLeft: 2, fontStyle: 'italic' }}>
//   //                 No Sales
//   //               </Typography>
//   //             )}
//   //           </AccordionDetails>
//   //         </Accordion>
//   //       ))}
//   //     </Box>
//   //   );
//   // };

//   type Role = 'General Manager' | 'Head of Sales' | 'Sales Operations' | 'Team Leader' | 'Sales';

//   const roleOrder: Record<Role, number> = {
//     'General Manager': 1,
//     'Head of Sales': 2,
//     'Sales Operations': 3,
//     'Team Leader': 4,
//     'Sales': 5,
//   };
  
//   const sortNodes = (nodes: UserNode[]) => {
//     return nodes.sort((a, b) => {
//       const roleA = a.role as Role;
//       const roleB = b.role as Role;
  
//       return roleOrder[roleA] - roleOrder[roleB];
//     });
//   };
  
//   const renderTree = (nodes: UserNode[]) => {
//     if (!Array.isArray(nodes)) {
//       return null;
//     }
  
//     const sortedNodes = sortNodes(nodes);
  
//     return (
//       <Box sx={{ marginLeft: 2 }}>
//       {sortedNodes.map((node) => (
//         <Accordion
//           key={node._id}
//           sx={{
//             marginBottom: 1,
//             backgroundColor: getRoleColor(node.role),
//             borderRadius: 2, // Rounded corners
//             boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
//             '&:before': {
//               display: 'none',
//             }, // Remove default border
//           }}
//         >
//           <AccordionSummary
//             expandIcon={<ExpandMoreIcon />}
//             aria-controls={`panel-${node._id}-content`}
//             id={`panel-${node._id}-header`}
//             sx={{
//               borderRadius: 2, // Apply the border radius to the summary as well
//             }}
//           >
//             <Typography variant="h6" sx={{ fontWeight: 600, color: '#333' }}>
//               {node.role}: {node.username}
//             </Typography>
//             <IconButton
//               aria-label="delete"
//               size="small"
//               onClick={() => {
//                 if (node && node._id) {
//                   const userId = node._id.toString(); // Convert ObjectId to string
//                   handleOpenDialog(userId); // Open confirmation dialog
//                 } else {
//                   console.error('node._id is undefined or node is invalid');
//                 }
//               }}
//               sx={{ marginLeft: 'auto' }}
//             >
//               <DeleteIcon fontSize="small" sx={{ color: '#666' }} />
//             </IconButton>
//           </AccordionSummary>
//           <AccordionDetails>
//             {node.children && node.children.length > 0 ? (
//               <>
//                 <Typography variant="body2" sx={{ marginLeft: 2, fontStyle: 'italic', color: '#555' }}>
//                   Sales:
//                 </Typography>
//                 {renderTree(node.children)}
//               </>
//             ) : (
//               <Typography variant="body2" sx={{ marginLeft: 2, fontStyle: 'italic', color: '#777' }}>
//                 No Sales
//               </Typography>
//             )}
//           </AccordionDetails>
//         </Accordion>
//       ))}
//     </Box>
//   );
// };
  

//   return (
//     <Box sx={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
//       <Typography variant="h4" component="h1" gutterBottom textAlign="center">
//         User Management
//       </Typography>
//       <Box
//         component="form"
//         onSubmit={handleAddUser}
//         sx={{
//           marginBottom: '20px',
//           display: 'flex',
//           flexDirection: 'column',
//           gap: '16px',
//           backgroundColor: '#f7f7f7',
//           padding: '20px',
//           borderRadius: '8px',
//           boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
//         }}
//       >
//         <TextField
//           label="Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           fullWidth
//           required
//         />
//         <TextField
//           label="Password"
//           type={showPassword ? 'text' : 'password'}
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           fullWidth
//           required
//           InputProps={{
//             endAdornment: (
//               <InputAdornment position="end">
//                 <IconButton
//                   onClick={togglePasswordVisibility}
//                   edge="end"
//                 >
//                   {showPassword ? <VisibilityOff /> : <Visibility />}
//                 </IconButton>
//               </InputAdornment>
//             ),
//           }}
//         />
//         <TextField
//           label="Role"
//           select
//           value={role}
//           onChange={(e) => setRole(e.target.value)}
//           fullWidth
//           required
//         >
//           <MenuItem value="General Manager">General Manager</MenuItem>
//           <MenuItem value="Head of Sales">Head of Sales</MenuItem>
//           <MenuItem value="Sales Operations">Sales Operations</MenuItem>
//           <MenuItem value="Team Leader">Team Leader</MenuItem>
//           <MenuItem value="Sales">Sales</MenuItem>
//         </TextField>

//         <TextField
//           label="Parent User"
//           select
//           value={parentId || 'none'}
//           onChange={(e) => {
//             const selectedValue = e.target.value;
//             setParentId(selectedValue === 'none' ? null : selectedValue);
//           }}
//           fullWidth
//         >
//           <MenuItem value="none" className='text-slate-700'>None (Top Level)</MenuItem>
//           {users.map((user) => (
//             <MenuItem key={user._id} value={user._id} className='text-slate-700'>
//               {user.username} ({user.role})
//             </MenuItem>
//           ))}
//         </TextField>

//         <Button type="submit" variant="contained" color="primary">
//           Add User
//         </Button>
//       </Box>

//       <Typography variant="h5" component="h2" gutterBottom textAlign="center">
//         Organization Hierarchy
//       </Typography>
//       <Box sx={{ marginTop: 2 }}>
//         {treeData.length > 0 ? renderTree(treeData) : <Typography>No data available</Typography>}
//       </Box>

//       <Snackbar 
//         open={snackbarOpen} 
//         autoHideDuration={3000} 
//         onClose={() => setSnackbarOpen(false)}
//       >
//         <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity}>
//           {snackbarMessage}
//         </Alert>
//       </Snackbar>

//       <Dialog
//         open={openDialog}
//         onClose={handleCloseDialog}
//         aria-labelledby="alert-dialog-title"
//         aria-describedby="alert-dialog-description"
//       >
//         <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
//         <DialogContent>
//           <DialogContentText id="alert-dialog-description">
//             Are you sure you want to delete this user? This action cannot be undone.
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseDialog} color="primary">
//             Cancel
//           </Button>
//           <Button onClick={handleConfirmDelete} color="primary" autoFocus>
//             Confirm
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default UserManagement;





















/////// workin







// import React, { useEffect, useState } from 'react';
// import {
//   Box,
//   Button,
//   TextField,
//   Typography,
//   MenuItem,
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
//   IconButton,
//   InputAdornment,
//   Snackbar,
//   Alert,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogContentText,
//   DialogTitle
// } from '@mui/material';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import DeleteIcon from '@mui/icons-material/Delete';
// import Visibility from '@mui/icons-material/Visibility';
// import VisibilityOff from '@mui/icons-material/VisibilityOff';
// import { useRouter } from 'next/router'; // Import useRouter for navigation

// interface UserNode {
//   _id: string;
//   username: string;
//   role: string;
//   children?: UserNode[];
// }

// const getRoleColor = (role: string) => {
//   switch (role) {
//     case 'General Manager':
//       return '#a7a7a7'; // Light grey
//     case 'Head of Sales':
//       return '#c6c6c6'; // Slightly darker grey
//     case 'Sales Operations':
//       return '#d3d3d3'; // Very light grey
//     case 'Team Leader':
//       return '#f5f5f5'; // Off white
//     case 'Sales':
//       return '#fafafa'; // Almost white
//     default:
//       return '#f0f0f0'; // Default grey
//   }
// };

// const UserManagement = () => {
//   const router = useRouter(); // Initialize the router hook

//   const [treeData, setTreeData] = useState<UserNode[]>([]);
//   const [users, setUsers] = useState<UserNode[]>([]);
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [role, setRole] = useState('');
//   const [parentId, setParentId] = useState<string | null>(null);
//   const [showPassword, setShowPassword] = useState(false);
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState('');
//   const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
//   const [openDialog, setOpenDialog] = useState(false);
//   const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch('/api/get-all-users');  // Use a new endpoint to fetch all users
//         const allUsers = await response.json();

//         // Now fetch the org chart separately
//         const parentUsersResponse = await fetch('/api/get-parent-users'); // New endpoint
//         const parentUsers = await parentUsersResponse.json();

//         const chartResponse = await fetch('/api/get-org-chart');
//         const treeData = await chartResponse.json();

//         console.log('API Response:', parentUsers);
//         setTreeData(treeData);
//         setUsers(parentUsers);  // Populate the users dropdown with all users
//       } catch (error) {
//         console.error('Failed to fetch org chart:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleAddUser = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       const response = await fetch('/api/assign-role', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ username, password, role, parentId }),
//       });

//       if (response.ok) {
//         setSnackbarMessage('User added successfully!');
//         setSnackbarSeverity('success');
//         setSnackbarOpen(true);
//         setUsername('');
//         setPassword('');
//         setRole('');
//         setParentId(null);
//         const fetchData = async () => {
//           const response = await fetch('/api/get-org-chart');
//           const data = await response.json();
//           setTreeData(data);
//         };
//         fetchData();
//       } else {
//         setSnackbarMessage('Failed to add user.');
//         setSnackbarSeverity('error');
//         setSnackbarOpen(true);
//       }
//     } catch (error) {
//       console.error('Error adding user:', error);
//       setSnackbarMessage('Failed to add user.');
//       setSnackbarSeverity('error');
//       setSnackbarOpen(true);
//     }
//   };

//   const handleDeleteUser = async (userId: string) => {
//     if (!userId) {
//       console.error('userId is undefined or invalid');
//       return;
//     }

//     try {
//       const response = await fetch('/api/delete-user', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ userId }),
//       });

//       if (response.ok) {
//         setSnackbarMessage('User deleted successfully!');
//         setSnackbarSeverity('success');
//         setSnackbarOpen(true);
//         const fetchData = async () => {
//           const response = await fetch('/api/get-org-chart');
//           const data = await response.json();
//           setTreeData(data);
//         };
//         fetchData();
//       } else {
//         console.error('Failed to delete user', await response.text());
//         setSnackbarMessage('Failed to delete user.');
//         setSnackbarSeverity('error');
//         setSnackbarOpen(true);
//       }
//     } catch (error) {
//       console.error('Error deleting user:', error);
//       setSnackbarMessage('Failed to delete user.');
//       setSnackbarSeverity('error');
//       setSnackbarOpen(true);
//     }
//   };

//   const handleOpenDialog = (userId: string) => {
//     setSelectedUserId(userId);
//     setOpenDialog(true);
//   };

//   const handleCloseDialog = () => {
//     setOpenDialog(false);
//     setSelectedUserId(null);
//   };

//   const handleConfirmDelete = () => {
//     if (selectedUserId) {
//       handleDeleteUser(selectedUserId);
//     }
//     setOpenDialog(false);
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };


//   type Role = 'General Manager' | 'Head of Sales' | 'Sales Operations' | 'Team Leader' | 'Sales';

//   const roleOrder: Record<Role, number> = {
//     'General Manager': 1,
//     'Head of Sales': 2,
//     'Sales Operations': 3,
//     'Team Leader': 4,
//     'Sales': 5,
//   };
  
//   const sortNodes = (nodes: UserNode[]) => {
//     return nodes.sort((a, b) => {
//       const roleA = a.role as Role;
//       const roleB = b.role as Role;
  
//       return roleOrder[roleA] - roleOrder[roleB];
//     });
//   };

//   // const roleOrder: Record<Role, number> = {
//   //   'General Manager': 1,
//   //   'Head of Sales': 2,
//   //   'Sales Operations': 3,
//   //   'Team Leader': 4,
//   //   'Sales': 5,
//   // };
  
//   // const sortNodes = (nodes: UserNode[]) => {
//   //   return nodes.sort((a, b) => {
//   //     const roleA = a.role as Role;
//   //     const roleB = b.role as Role;
  
//   //     return roleOrder[roleA] - roleOrder[roleB];
//   //   });
//   // };
  
//   const renderTree = (nodes: UserNode[]) => {
//     if (!Array.isArray(nodes)) {
//       return null;
//     }
  
//     const sortedNodes = sortNodes(nodes);
  
//     return (
//       <Box sx={{ marginLeft: 2 }}>
//       {sortedNodes.map((node) => (
//         <Accordion
//           key={node._id}
//           sx={{
//             marginBottom: 1,
//             backgroundColor: getRoleColor(node.role),
//             borderRadius: 2, // Rounded corners
//             boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
//             '&:before': {
//               display: 'none',
//             }, // Remove default border
//           }}
//         >
//           <AccordionSummary
//             expandIcon={<ExpandMoreIcon />}
//             aria-controls={`panel-${node._id}-content`}
//             id={`panel-${node._id}-header`}
//             sx={{
//               borderRadius: 2, // Apply the border radius to the summary as well
//             }}
//           >
//             <Typography variant="h6" sx={{ fontWeight: 600, color: '#333' }}>
//               {node.role}: {node.username}
//             </Typography>
//             <IconButton
//               aria-label="delete"
//               size="small"
//               onClick={() => {
//                 if (node && node._id) {
//                   const userId = node._id.toString(); // Convert ObjectId to string
//                   handleOpenDialog(userId); // Open confirmation dialog
//                 } else {
//                   console.error('node._id is undefined or node is invalid');
//                 }
//               }}
//               sx={{ marginLeft: 'auto' }}
//             >
//               <DeleteIcon fontSize="small" sx={{ color: '#666' }} />
//             </IconButton>
//           </AccordionSummary>
//           <AccordionDetails>
//             {node.children && node.children.length > 0 ? (
//               <>
//                 <Typography variant="body2" sx={{ marginLeft: 2, fontStyle: 'italic', color: '#555' }}>
//                   Sales:
//                 </Typography>
//                 {renderTree(node.children)}
//               </>
//             ) : (
//               <Typography variant="body2" sx={{ marginLeft: 2, fontStyle: 'italic', color: '#777' }}>
//                 No Sales
//               </Typography>
//             )}
//           </AccordionDetails>
//         </Accordion>
//       ))}
//     </Box>
//   );
// };
  

//   return (
//     <Box sx={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
//       <Typography variant="h4" component="h1" gutterBottom textAlign="center">
//         User Management
//       </Typography>
//       <Box
//         component="form"
//         onSubmit={handleAddUser}
//         sx={{
//           marginBottom: '20px',
//           display: 'flex',
//           flexDirection: 'column',
//           gap: '16px',
//           backgroundColor: '#f7f7f7',
//           padding: '20px',
//           borderRadius: '8px',
//           boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
//         }}
//       >
//         <TextField
//           label="Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           fullWidth
//           required
//         />
//         <TextField
//           label="Password"
//           type={showPassword ? 'text' : 'password'}
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           fullWidth
//           required
//           InputProps={{
//             endAdornment: (
//               <InputAdornment position="end">
//                 <IconButton
//                   onClick={togglePasswordVisibility}
//                   edge="end"
//                 >
//                   {showPassword ? <VisibilityOff /> : <Visibility />}
//                 </IconButton>
//               </InputAdornment>
//             ),
//           }}
//         />
//         <TextField
//           label="Role"
//           select
//           value={role}
//           onChange={(e) => setRole(e.target.value)}
//           fullWidth
//           required
//         >
//           <MenuItem value="General Manager">General Manager</MenuItem>
//           <MenuItem value="Head of Sales">Head of Sales</MenuItem>
//           <MenuItem value="Sales Operations">Sales Operations</MenuItem>
//           <MenuItem value="Team Leader">Team Leader</MenuItem>
//           <MenuItem value="Sales">Sales</MenuItem>
//         </TextField>

//         <TextField
//           label="Parent User"
//           select
//           value={parentId || 'none'}
//           onChange={(e) => {
//             const selectedValue = e.target.value;
//             setParentId(selectedValue === 'none' ? null : selectedValue);
//           }}
//           fullWidth
//         >
//           <MenuItem value="none" className='text-slate-700'>None (Top Level)</MenuItem>
//           {users.map((user) => (
//             <MenuItem key={user._id} value={user._id} className='text-slate-700'>
//               {user.username} ({user.role})
//             </MenuItem>
//           ))}
//         </TextField>

//         <Button type="submit" variant="contained" color="primary">
//           Add User
//         </Button>
//       </Box>

//       <Typography variant="h5" component="h2" gutterBottom textAlign="center">
//         Organization Hierarchy
//       </Typography>
//       <Box sx={{ marginTop: 2 }}>
//         {treeData.length > 0 ? renderTree(treeData) : <Typography>No data available</Typography>}
//       </Box>

//       <Snackbar 
//         open={snackbarOpen} 
//         autoHideDuration={3000} 
//         onClose={() => setSnackbarOpen(false)}
//       >
//         <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity}>
//           {snackbarMessage}
//         </Alert>
//       </Snackbar>

//       <Dialog
//         open={openDialog}
//         onClose={handleCloseDialog}
//         aria-labelledby="alert-dialog-title"
//         aria-describedby="alert-dialog-description"
//       >
//         <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
//         <DialogContent>
//           <DialogContentText id="alert-dialog-description">
//             Are you sure you want to delete this user? This action cannot be undone.
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseDialog} color="primary">
//             Cancel
//           </Button>
//           <Button onClick={handleConfirmDelete} color="primary" autoFocus>
//             Confirm
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Button to navigate to GM Dashboard */}
//       <Box sx={{ marginTop: 2, textAlign: 'center' }}>
//         <Button variant="contained" color="secondary" onClick={() => router.push('/dashboard/general-manager')}>
//           Return to General Manager Dashboard
//         </Button>
//       </Box>
//     </Box>
//   );
// };

// export default UserManagement;



















// import React, { useEffect, useState } from 'react';
// import {
//   Box,
//   Button,
//   TextField,
//   Typography,
//   MenuItem,
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
//   IconButton,
//   InputAdornment,
//   Snackbar,
//   Alert,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogContentText,
//   DialogTitle,
//   Tooltip,
// } from '@mui/material';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import DeleteIcon from '@mui/icons-material/Delete';
// import Visibility from '@mui/icons-material/Visibility';
// import VisibilityOff from '@mui/icons-material/VisibilityOff';
// import EditIcon from '@mui/icons-material/Edit';
// import { useRouter } from 'next/router';

// interface UserNode {
//   _id: string;
//   username: string;
//   role: string;
//   children?: UserNode[];
// }

// const getRoleColor = (role: string) => {
//   switch (role) {
//     case 'General Manager':
//       return '#a7a7a7'; // Light grey
//     case 'Head of Sales':
//       return '#c6c6c6'; // Slightly darker grey
//     case 'Sales Operations':
//       return '#d3d3d3'; // Very light grey
//     case 'Team Leader':
//       return '#f5f5f5'; // Off white
//     case 'Sales':
//       return '#fafafa'; // Almost white
//     default:
//       return '#f0f0f0'; // Default grey
//   }
// };

// const UserManagement = () => {
//   const router = useRouter();

//   const [treeData, setTreeData] = useState<UserNode[]>([]);
//   const [users, setUsers] = useState<UserNode[]>([]);
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [role, setRole] = useState('');
//   const [parentId, setParentId] = useState<string | null>(null);
//   const [showPassword, setShowPassword] = useState(false);
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState('');
//   const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
//   const [openDialog, setOpenDialog] = useState(false);
//   const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
//   const [selectedPassword, setSelectedPassword] = useState(''); // New state for password management

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch('/api/get-all-users');
//         const allUsers = await response.json();

//         const parentUsersResponse = await fetch('/api/get-parent-users');
//         const parentUsers = await parentUsersResponse.json();

//         const chartResponse = await fetch('/api/get-org-chart');
//         const treeData = await chartResponse.json();

//         console.log('API Response:', parentUsers);
//         setTreeData(treeData);
//         setUsers(parentUsers);
//       } catch (error) {
//         console.error('Failed to fetch org chart:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleAddUser = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       const response = await fetch('/api/assign-role', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ username, password, role, parentId }),
//       });

//       if (response.ok) {
//         setSnackbarMessage('User added successfully!');
//         setSnackbarSeverity('success');
//         setSnackbarOpen(true);
//         setUsername('');
//         setPassword('');
//         setRole('');
//         setParentId(null);
//         const fetchData = async () => {
//           const response = await fetch('/api/get-org-chart');
//           const data = await response.json();
//           setTreeData(data);
//         };
//         fetchData();
//       } else {
//         setSnackbarMessage('Failed to add user.');
//         setSnackbarSeverity('error');
//         setSnackbarOpen(true);
//       }
//     } catch (error) {
//       console.error('Error adding user:', error);
//       setSnackbarMessage('Failed to add user.');
//       setSnackbarSeverity('error');
//       setSnackbarOpen(true);
//     }
//   };

//   const handleDeleteUser = async (userId: string) => {
//     if (!userId) {
//       console.error('userId is undefined or invalid');
//       return;
//     }

//     try {
//       const response = await fetch('/api/delete-user', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ userId }),
//       });

//       if (response.ok) {
//         setSnackbarMessage('User deleted successfully!');
//         setSnackbarSeverity('success');
//         setSnackbarOpen(true);
//         const fetchData = async () => {
//           const response = await fetch('/api/get-org-chart');
//           const data = await response.json();
//           setTreeData(data);
//         };
//         fetchData();
//       } else {
//         console.error('Failed to delete user', await response.text());
//         setSnackbarMessage('Failed to delete user.');
//         setSnackbarSeverity('error');
//         setSnackbarOpen(true);
//       }
//     } catch (error) {
//       console.error('Error deleting user:', error);
//       setSnackbarMessage('Failed to delete user.');
//       setSnackbarSeverity('error');
//       setSnackbarOpen(true);
//     }
//   };

//   const handleOpenDialog = (userId: string) => {
//     setSelectedUserId(userId);
//     setOpenDialog(true);
//   };

//   const handleCloseDialog = () => {
//     setOpenDialog(false);
//     setSelectedUserId(null);
//   };

//   const handleConfirmDelete = () => {
//     if (selectedUserId) {
//       handleDeleteUser(selectedUserId);
//     }
//     setOpenDialog(false);
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const handleChangePassword = async (userId: string) => {
//     try {
//       const response = await fetch('/api/change-password', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ userId, newPassword: selectedPassword }),
//       });

//       if (response.ok) {
//         setSnackbarMessage('Password changed successfully!');
//         setSnackbarSeverity('success');
//         setSnackbarOpen(true);
//       } else {
//         setSnackbarMessage('Failed to change password.');
//         setSnackbarSeverity('error');
//         setSnackbarOpen(true);
//       }
//     } catch (error) {
//       console.error('Error changing password:', error);
//       setSnackbarMessage('Failed to change password.');
//       setSnackbarSeverity('error');
//       setSnackbarOpen(true);
//     }
//   };

//   type Role = 'General Manager' | 'Head of Sales' | 'Sales Operations' | 'Team Leader' | 'Sales';

//   const roleOrder: Record<Role, number> = {
//     'General Manager': 1,
//     'Head of Sales': 2,
//     'Sales Operations': 3,
//     'Team Leader': 4,
//     'Sales': 5,
//   };
  
//   const sortNodes = (nodes: UserNode[]) => {
//     return nodes.sort((a, b) => {
//       const roleA = a.role as Role;
//       const roleB = b.role as Role;
  
//       return roleOrder[roleA] - roleOrder[roleB];
//     });
//   };

//   const renderTree = (nodes: UserNode[]) => {
//     if (!Array.isArray(nodes)) {
//       return null;
//     }

//     const sortedNodes = sortNodes(nodes);

//     return (
//       <Box sx={{ marginLeft: 2 }}>
//         {sortedNodes.map((node) => (
//           <Accordion
//             key={node._id}
//             sx={{
//               marginBottom: 1,
//               backgroundColor: getRoleColor(node.role),
//               borderRadius: 2, // Rounded corners
//               boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
//               '&:before': {
//                 display: 'none',
//               }, // Remove default border
//             }}
//           >
//             <AccordionSummary
//               expandIcon={<ExpandMoreIcon />}
//               aria-controls={`panel-${node._id}-content`}
//               id={`panel-${node._id}-header`}
//               sx={{
//                 borderRadius: 2, // Apply the border radius to the summary as well
//               }}
//             >
//               <Typography variant="h6" sx={{ fontWeight: 600, color: '#333' }}>
//                 {node.role}: {node.username}
//               </Typography>
//               <Box sx={{ marginLeft: 'auto', display: 'flex', gap: 1 }}>
//                 <Tooltip title="Change Password">
//                   <IconButton
//                     aria-label="change-password"
//                     size="small"
//                     onClick={() => {
//                       setSelectedUserId(node._id);
//                       setSelectedPassword(''); // Reset password field
//                       setOpenDialog(true);
//                     }}
//                     sx={{ color: '#666' }}
//                   >
//                     <EditIcon fontSize="small" />
//                   </IconButton>
//                 </Tooltip>
//                 <Tooltip title="Delete User">
//                   <IconButton
//                     aria-label="delete"
//                     size="small"
//                     onClick={() => {
//                       if (node && node._id) {
//                         handleOpenDialog(node._id);
//                       } else {
//                         console.error('node._id is undefined or node is invalid');
//                       }
//                     }}
//                     sx={{ color: '#666' }}
//                   >
//                     <DeleteIcon fontSize="small" />
//                   </IconButton>
//                 </Tooltip>
//               </Box>
//             </AccordionSummary>
//             <AccordionDetails>
//               {node.children && node.children.length > 0 ? (
//                 <>
//                   <Typography variant="body2" sx={{ marginLeft: 2, fontStyle: 'italic', color: '#555' }}>
//                     Sales:
//                   </Typography>
//                   {renderTree(node.children)}
//                 </>
//               ) : (
//                 <Typography variant="body2" sx={{ marginLeft: 2, fontStyle: 'italic', color: '#777' }}>
//                   No Sales
//                 </Typography>
//               )}
//             </AccordionDetails>
//           </Accordion>
//         ))}
//       </Box>
//     );
//   };

//   return (
//     <Box sx={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
//       <Typography variant="h4" component="h1" gutterBottom textAlign="center">
//         User Management
//       </Typography>
//       <Box
//         component="form"
//         onSubmit={handleAddUser}
//         sx={{
//           marginBottom: '20px',
//           display: 'flex',
//           flexDirection: 'column',
//           gap: '16px',
//           backgroundColor: '#f7f7f7',
//           padding: '20px',
//           borderRadius: '8px',
//           boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
//         }}
//       >
//         <TextField
//           label="Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           fullWidth
//           required
//         />
//         <TextField
//           label="Password"
//           type={showPassword ? 'text' : 'password'}
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           fullWidth
//           required
//           InputProps={{
//             endAdornment: (
//               <InputAdornment position="end">
//                 <IconButton
//                   onClick={togglePasswordVisibility}
//                   edge="end"
//                 >
//                   {showPassword ? <VisibilityOff /> : <Visibility />}
//                 </IconButton>
//               </InputAdornment>
//             ),
//           }}
//         />
//         <TextField
//           label="Role"
//           select
//           value={role}
//           onChange={(e) => setRole(e.target.value)}
//           fullWidth
//           required
//         >
//           <MenuItem value="General Manager">General Manager</MenuItem>
//           <MenuItem value="Head of Sales">Head of Sales</MenuItem>
//           <MenuItem value="Sales Operations">Sales Operations</MenuItem>
//           <MenuItem value="Team Leader">Team Leader</MenuItem>
//           <MenuItem value="Sales">Sales</MenuItem>
//         </TextField>

//         <TextField
//           label="Parent User"
//           select
//           value={parentId || 'none'}
//           onChange={(e) => {
//             const selectedValue = e.target.value;
//             setParentId(selectedValue === 'none' ? null : selectedValue);
//           }}
//           fullWidth
//         >
//           <MenuItem value="none" className='text-slate-700'>None (Top Level)</MenuItem>
//           {users.map((user) => (
//             <MenuItem key={user._id} value={user._id} className='text-slate-700'>
//               {user.username} ({user.role})
//             </MenuItem>
//           ))}
//         </TextField>

//         <Button type="submit" variant="contained" color="primary">
//           Add User
//         </Button>
//       </Box>

//       <Typography variant="h5" component="h2" gutterBottom textAlign="center">
//         Organization Hierarchy
//       </Typography>
//       <Box sx={{ marginTop: 2 }}>
//         {treeData.length > 0 ? renderTree(treeData) : <Typography>No data available</Typography>}
//       </Box>

//       <Snackbar 
//         open={snackbarOpen} 
//         autoHideDuration={3000} 
//         onClose={() => setSnackbarOpen(false)}
//       >
//         <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity}>
//           {snackbarMessage}
//         </Alert>
//       </Snackbar>

//       <Dialog
//         open={openDialog}
//         onClose={handleCloseDialog}
//         aria-labelledby="alert-dialog-title"
//         aria-describedby="alert-dialog-description"
//       >
//         <DialogTitle id="alert-dialog-title">{"Confirm Action"}</DialogTitle>
//         <DialogContent>
//           {selectedUserId && (
//             <DialogContentText id="alert-dialog-description">
//               Are you sure you want to delete this user? This action cannot be undone.
//             </DialogContentText>
//           )}
//           {selectedUserId && (
//             <TextField
//               label="New Password"
//               type={showPassword ? 'text' : 'password'}
//               value={selectedPassword}
//               onChange={(e) => setSelectedPassword(e.target.value)}
//               fullWidth
//               required
//               InputProps={{
//                 endAdornment: (
//                   <InputAdornment position="end">
//                     <IconButton
//                       onClick={togglePasswordVisibility}
//                       edge="end"
//                     >
//                       {showPassword ? <VisibilityOff /> : <Visibility />}
//                     </IconButton>
//                   </InputAdornment>
//                 ),
//               }}
//             />
//           )}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseDialog} color="primary">
//             Cancel
//           </Button>
//           {selectedUserId ? (
//             <Button onClick={handleConfirmDelete} color="primary" autoFocus>
//               Confirm Delete
//             </Button>
//           ) : (
//             <Button onClick={() => handleChangePassword(selectedUserId!)} color="primary" autoFocus>
//               Confirm Change Password
//             </Button>
//           )}
//         </DialogActions>
//       </Dialog>

//       {/* Button to navigate to GM Dashboard */}
//       <Box sx={{ marginTop: 2, textAlign: 'center' }}>
//         <Button variant="contained" color="secondary" onClick={() => router.push('/dashboard/general-manager')}>
//           Return to General Manager Dashboard
//         </Button>
//       </Box>
//     </Box>
//   );
// };

// export default UserManagement;










// import React, { useEffect, useState } from 'react';
// import {
//   Box,
//   Button,
//   TextField,
//   Typography,
//   MenuItem,
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
//   IconButton,
//   InputAdornment,
//   Snackbar,
//   Alert,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogContentText,
//   DialogTitle,
//   Tooltip,
// } from '@mui/material';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import DeleteIcon from '@mui/icons-material/Delete';
// import Visibility from '@mui/icons-material/Visibility';
// import VisibilityOff from '@mui/icons-material/VisibilityOff';
// import EditIcon from '@mui/icons-material/Edit';
// import { useRouter } from 'next/router';

// interface UserNode {
//   _id: string;
//   username: string;
//   role: string;
//   children?: UserNode[];
// }

// const getRoleColor = (role: string) => {
//   switch (role) {
//     case 'General Manager':
//       return '#a7a7a7'; // Light grey
//     case 'Head of Sales':
//       return '#c6c6c6'; // Slightly darker grey
//     case 'Sales Operations':
//       return '#d3d3d3'; // Very light grey
//     case 'Team Leader':
//       return '#f5f5f5'; // Off white
//     case 'Sales':
//       return '#fafafa'; // Almost white
//     default:
//       return '#f0f0f0'; // Default grey
//   }
// };

// const UserManagement = () => {
//   const router = useRouter();

//   const [treeData, setTreeData] = useState<UserNode[]>([]);
//   const [users, setUsers] = useState<UserNode[]>([]);
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [role, setRole] = useState('');
//   const [parentId, setParentId] = useState<string | null>(null);
//   const [showPassword, setShowPassword] = useState(false);
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState('');
//   const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
//   const [openDialog, setOpenDialog] = useState(false);
//   const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
//   const [selectedPassword, setSelectedPassword] = useState(''); // New state for password management
//   const [dialogAction, setDialogAction] = useState<'delete' | 'changePassword'>('delete'); // Track current action

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch('/api/get-all-users');
//         const allUsers = await response.json();

//         const parentUsersResponse = await fetch('/api/get-parent-users');
//         const parentUsers = await parentUsersResponse.json();

//         const chartResponse = await fetch('/api/get-org-chart');
//         const treeData = await chartResponse.json();

//         setTreeData(treeData);
//         setUsers(parentUsers);
//       } catch (error) {
//         console.error('Failed to fetch org chart:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleAddUser = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       const response = await fetch('/api/assign-role', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ username, password, role, parentId }),
//       });

//       if (response.ok) {
//         setSnackbarMessage('User added successfully!');
//         setSnackbarSeverity('success');
//         setSnackbarOpen(true);
//         setUsername('');
//         setPassword('');
//         setRole('');
//         setParentId(null);
//         const fetchData = async () => {
//           const response = await fetch('/api/get-org-chart');
//           const data = await response.json();
//           setTreeData(data);
//         };
//         fetchData();
//       } else {
//         setSnackbarMessage('Failed to add user.');
//         setSnackbarSeverity('error');
//         setSnackbarOpen(true);
//       }
//     } catch (error) {
//       console.error('Error adding user:', error);
//       setSnackbarMessage('Failed to add user.');
//       setSnackbarSeverity('error');
//       setSnackbarOpen(true);
//     }
//   };

//   const handleDeleteUser = async (userId: string) => {
//     if (!userId) {
//       console.error('userId is undefined or invalid');
//       return;
//     }

//     try {
//       const response = await fetch('/api/delete-user', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ userId }),
//       });

//       if (response.ok) {
//         setSnackbarMessage('User deleted successfully!');
//         setSnackbarSeverity('success');
//         setSnackbarOpen(true);
//         const fetchData = async () => {
//           const response = await fetch('/api/get-org-chart');
//           const data = await response.json();
//           setTreeData(data);
//         };
//         fetchData();
//       } else {
//         console.error('Failed to delete user', await response.text());
//         setSnackbarMessage('Failed to delete user.');
//         setSnackbarSeverity('error');
//         setSnackbarOpen(true);
//       }
//     } catch (error) {
//       console.error('Error deleting user:', error);
//       setSnackbarMessage('Failed to delete user.');
//       setSnackbarSeverity('error');
//       setSnackbarOpen(true);
//     }
//   };

//   const handleOpenDialog = (userId: string, action: 'delete' | 'changePassword') => {
//     setSelectedUserId(userId);
//     setDialogAction(action); // Set the action type
//     setOpenDialog(true);
//   };

//   const handleCloseDialog = () => {
//     setOpenDialog(false);
//     setSelectedUserId(null);
//   };

//   const handleConfirmAction = () => {
//     if (dialogAction === 'delete') {
//       handleDeleteUser(selectedUserId!);
//     } else if (dialogAction === 'changePassword') {
//       handleChangePassword(selectedUserId!);
//     }
//     setOpenDialog(false);
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const handleChangePassword = async (userId: string) => {
//     try {
//       const response = await fetch('/api/change-password', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ userId, newPassword: selectedPassword }),
//       });

//       if (response.ok) {
//         setSnackbarMessage('Password changed successfully!');
//         setSnackbarSeverity('success');
//         setSnackbarOpen(true);
//       } else {
//         setSnackbarMessage('Failed to change password.');
//         setSnackbarSeverity('error');
//         setSnackbarOpen(true);
//       }
//     } catch (error) {
//       console.error('Error changing password:', error);
//       setSnackbarMessage('Failed to change password.');
//       setSnackbarSeverity('error');
//       setSnackbarOpen(true);
//     }
//   };

//   type Role = 'General Manager' | 'Head of Sales' | 'Sales Operations' | 'Team Leader' | 'Sales';

//   const roleOrder: Record<Role, number> = {
//     'General Manager': 1,
//     'Head of Sales': 2,
//     'Sales Operations': 3,
//     'Team Leader': 4,
//     'Sales': 5,
//   };
  
//   const sortNodes = (nodes: UserNode[]) => {
//     return nodes.sort((a, b) => {
//       const roleA = a.role as Role;
//       const roleB = b.role as Role;
  
//       return roleOrder[roleA] - roleOrder[roleB];
//     });
//   };

//   const renderTree = (nodes: UserNode[]) => {
//     if (!Array.isArray(nodes)) {
//       return null;
//     }

//     const sortedNodes = sortNodes(nodes);

//     return (
//       <Box sx={{ marginLeft: 2 }}>
//         {sortedNodes.map((node) => (
//           <Accordion
//             key={node._id}
//             sx={{
//               marginBottom: 1,
//               backgroundColor: getRoleColor(node.role),
//               borderRadius: 2,
//               boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
//               '&:before': {
//                 display: 'none',
//               },
//             }}
//           >
//             <AccordionSummary
//               expandIcon={<ExpandMoreIcon />}
//               aria-controls={`panel-${node._id}-content`}
//               id={`panel-${node._id}-header`}
//               sx={{
//                 borderRadius: 2,
//               }}
//             >
//               <Typography variant="h6" sx={{ fontWeight: 600, color: '#333' }}>
//                 {node.role}: {node.username}
//               </Typography>
//               <Box sx={{ marginLeft: 'auto', display: 'flex', gap: 1 }}>
//                 <Tooltip title="Change Password">
//                   <IconButton
//                     aria-label="change-password"
//                     size="small"
//                     onClick={() => handleOpenDialog(node._id, 'changePassword')}
//                     sx={{ color: '#666' }}
//                   >
//                     <EditIcon fontSize="small" />
//                   </IconButton>
//                 </Tooltip>
//                 <Tooltip title="Delete User">
//                   <IconButton
//                     aria-label="delete"
//                     size="small"
//                     onClick={() => handleOpenDialog(node._id, 'delete')}
//                     sx={{ color: '#666' }}
//                   >
//                     <DeleteIcon fontSize="small" />
//                   </IconButton>
//                 </Tooltip>
//               </Box>
//             </AccordionSummary>
//             <AccordionDetails>
//               {node.children && node.children.length > 0 ? (
//                 <>
//                   <Typography variant="body2" sx={{ marginLeft: 2, fontStyle: 'italic', color: '#555' }}>
//                     Sales:
//                   </Typography>
//                   {renderTree(node.children)}
//                 </>
//               ) : (
//                 <Typography variant="body2" sx={{ marginLeft: 2, fontStyle: 'italic', color: '#777' }}>
//                   No Sales
//                 </Typography>
//               )}
//             </AccordionDetails>
//           </Accordion>
//         ))}
//       </Box>
//     );
//   };

//   return (
//     <Box sx={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
//       <Typography variant="h4" component="h1" gutterBottom textAlign="center">
//         User Management
//       </Typography>
//       <Box
//         component="form"
//         onSubmit={handleAddUser}
//         sx={{
//           marginBottom: '20px',
//           display: 'flex',
//           flexDirection: 'column',
//           gap: '16px',
//           backgroundColor: '#f7f7f7',
//           padding: '20px',
//           borderRadius: '8px',
//           boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
//         }}
//       >
//         <TextField
//           label="Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           fullWidth
//           required
//         />
//         <TextField
//           label="Password"
//           type={showPassword ? 'text' : 'password'}
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           fullWidth
//           required
//           InputProps={{
//             endAdornment: (
//               <InputAdornment position="end">
//                 <IconButton
//                   onClick={togglePasswordVisibility}
//                   edge="end"
//                 >
//                   {showPassword ? <VisibilityOff /> : <Visibility />}
//                 </IconButton>
//               </InputAdornment>
//             ),
//           }}
//         />
//         <TextField
//           label="Role"
//           select
//           value={role}
//           onChange={(e) => setRole(e.target.value)}
//           fullWidth
//           required
//         >
//           <MenuItem value="General Manager">General Manager</MenuItem>
//           <MenuItem value="Head of Sales">Head of Sales</MenuItem>
//           <MenuItem value="Sales Operations">Sales Operations</MenuItem>
//           <MenuItem value="Team Leader">Team Leader</MenuItem>
//           <MenuItem value="Sales">Sales</MenuItem>
//         </TextField>

//         <TextField
//           label="Parent User"
//           select
//           value={parentId || 'none'}
//           onChange={(e) => {
//             const selectedValue = e.target.value;
//             setParentId(selectedValue === 'none' ? null : selectedValue);
//           }}
//           fullWidth
//         >
//           <MenuItem value="none" className='text-slate-700'>None (Top Level)</MenuItem>
//           {users.map((user) => (
//             <MenuItem key={user._id} value={user._id} className='text-slate-700'>
//               {user.username} ({user.role})
//             </MenuItem>
//           ))}
//         </TextField>

//         <Button type="submit" variant="contained" color="primary">
//           Add User
//         </Button>
//       </Box>

//       <Typography variant="h5" component="h2" gutterBottom textAlign="center">
//         Organization Hierarchy
//       </Typography>
//       <Box sx={{ marginTop: 2 }}>
//         {treeData.length > 0 ? renderTree(treeData) : <Typography>No data available</Typography>}
//       </Box>

//       <Snackbar 
//         open={snackbarOpen} 
//         autoHideDuration={3000} 
//         onClose={() => setSnackbarOpen(false)}
//       >
//         <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity}>
//           {snackbarMessage}
//         </Alert>
//       </Snackbar>

//       <Dialog
//         open={openDialog}
//         onClose={handleCloseDialog}
//         aria-labelledby="alert-dialog-title"
//         aria-describedby="alert-dialog-description"
//       >
//         <DialogTitle id="alert-dialog-title">
//           {dialogAction === 'delete' ? 'Confirm Delete' : 'Change Password'}
//         </DialogTitle>
//         <DialogContent>
//           {dialogAction === 'delete' ? (
//             <DialogContentText id="alert-dialog-description">
//               Are you sure you want to delete this user? This action cannot be undone.
//             </DialogContentText>
//           ) : (
//             <TextField
//               label="New Password"
//               type={showPassword ? 'text' : 'password'}
//               value={selectedPassword}
//               onChange={(e) => setSelectedPassword(e.target.value)}
//               fullWidth
//               required
//               InputProps={{
//                 endAdornment: (
//                   <InputAdornment position="end">
//                     <IconButton
//                       onClick={togglePasswordVisibility}
//                       edge="end"
//                     >
//                       {showPassword ? <VisibilityOff /> : <Visibility />}
//                     </IconButton>
//                   </InputAdornment>
//                 ),
//               }}
//             />
//           )}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseDialog} color="primary">
//             Cancel
//           </Button>
//           <Button onClick={handleConfirmAction} color="primary" autoFocus>
//             {dialogAction === 'delete' ? 'Confirm Delete' : 'Confirm Change Password'}
//           </Button>
//         </DialogActions>
//       </Dialog>

//       <Box sx={{ marginTop: 2, textAlign: 'center' }}>
//         <Button variant="contained" color="secondary" onClick={() => router.push('/dashboard/general-manager')}>
//           Return to General Manager Dashboard
//         </Button>
//       </Box>
//     </Box>
//   );
// };

// export default UserManagement;




import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  InputAdornment,
  Snackbar,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Tooltip,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import EditIcon from '@mui/icons-material/Edit';
import { useRouter } from 'next/router';

interface UserNode {
  _id: string;
  username: string;
  role: string;
  children?: UserNode[];
}

const getRoleColor = (role: string) => {
  switch (role) {
    case 'General Manager':
      return '#a7a7a7'; // Light grey
    case 'Head of Sales':
      return '#c6c6c6'; // Slightly darker grey
    case 'Sales Operations':
      return '#d3d3d3'; // Very light grey
    case 'Team Leader':
      return '#f5f5f5'; // Off white
    case 'Sales':
      return '#fafafa'; // Almost white
    default:
      return '#f0f0f0'; // Default grey
  }
};

const UserManagement = () => {
  const router = useRouter();

  const [treeData, setTreeData] = useState<UserNode[]>([]);
  const [users, setUsers] = useState<UserNode[]>([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [parentId, setParentId] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [selectedPassword, setSelectedPassword] = useState(''); // New state for password management
  const [dialogAction, setDialogAction] = useState<'delete' | 'changePassword'>('delete'); // Track current action

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/get-all-users');
        const allUsers = await response.json();

        const parentUsersResponse = await fetch('/api/get-parent-users');
        const parentUsers = await parentUsersResponse.json();

        const chartResponse = await fetch('/api/get-org-chart');
        const treeData = await chartResponse.json();

        setTreeData(treeData);
        setUsers(parentUsers);
      } catch (error) {
        console.error('Failed to fetch org chart:', error);
      }
    };

    fetchData();
  }, []);

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/assign-role', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, role, parentId }),
      });

      if (response.ok) {
        setSnackbarMessage('User added successfully!');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        setUsername('');
        setPassword('');
        setRole('');
        setParentId(null);
        const fetchData = async () => {
          const response = await fetch('/api/get-org-chart');
          const data = await response.json();
          setTreeData(data);
        };
        fetchData();
      } else {
        setSnackbarMessage('Failed to add user.');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error('Error adding user:', error);
      setSnackbarMessage('Failed to add user.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!userId) {
      console.error('userId is undefined or invalid');
      return;
    }

    try {
      const response = await fetch('/api/delete-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });

      if (response.ok) {
        setSnackbarMessage('User deleted successfully!');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        const fetchData = async () => {
          const response = await fetch('/api/get-org-chart');
          const data = await response.json();
          setTreeData(data);
        };
        fetchData();
      } else {
        console.error('Failed to delete user', await response.text());
        setSnackbarMessage('Failed to delete user.');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      setSnackbarMessage('Failed to delete user.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleOpenDialog = (userId: string, action: 'delete' | 'changePassword') => {
    setSelectedUserId(userId);
    setDialogAction(action); // Set the action type
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedUserId(null);
  };

  const handleConfirmAction = () => {
    if (dialogAction === 'delete') {
      handleDeleteUser(selectedUserId!);
    } else if (dialogAction === 'changePassword') {
      handleChangePassword(selectedUserId!);
    }
    setOpenDialog(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChangePassword = async (userId: string) => {
    try {
      const response = await fetch('/api/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, newPassword: selectedPassword }),
      });

      if (response.ok) {
        setSnackbarMessage('Password changed successfully!');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
      } else {
        setSnackbarMessage('Failed to change password.');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error('Error changing password:', error);
      setSnackbarMessage('Failed to change password.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  type Role = 'General Manager' | 'Head of Sales' | 'Sales Operations' | 'Team Leader' | 'Sales';

  const roleOrder: Record<Role, number> = {
    'General Manager': 1,
    'Head of Sales': 2,
    'Sales Operations': 3,
    'Team Leader': 4,
    'Sales': 5,
  };

  const sortNodes = (nodes: UserNode[]) => {
    return nodes.sort((a, b) => {
      const roleA = a.role as Role;
      const roleB = b.role as Role;

      return roleOrder[roleA] - roleOrder[roleB];
    });
  };

  const renderTree = (nodes: UserNode[]) => {
    if (!Array.isArray(nodes)) {
      return null;
    }

    const sortedNodes = sortNodes(nodes);

    return (
      <Box sx={{ marginLeft: 2 }}>
        {sortedNodes.map((node) => (
          <Accordion
            key={node._id}
            sx={{
              marginBottom: 1,
              backgroundColor: getRoleColor(node.role),
              borderRadius: 2,
              boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
              '&:before': {
                display: 'none',
              },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel-${node._id}-content`}
              id={`panel-${node._id}-header`}
              sx={{
                borderRadius: 2,
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#333' }}>
                {node.role}: {node.username}
              </Typography>
              <Box sx={{ marginLeft: 'auto', display: 'flex', gap: 1 }}>
                <Tooltip title="Change Password">
                  <IconButton
                    aria-label="change-password"
                    size="small"
                    onClick={() => handleOpenDialog(node._id, 'changePassword')}
                    sx={{ color: '#666' }}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete User">
                  <IconButton
                    aria-label="delete"
                    size="small"
                    onClick={() => handleOpenDialog(node._id, 'delete')}
                    sx={{ color: '#666' }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              {node.children && node.children.length > 0 ? (
                <>
                  <Typography variant="body2" sx={{ marginLeft: 2, fontStyle: 'italic', color: '#555' }}>
                    Sales:
                  </Typography>
                  {renderTree(node.children)}
                </>
              ) : (
                <Typography variant="body2" sx={{ marginLeft: 2, fontStyle: 'italic', color: '#777' }}>
                  No Sales
                </Typography>
              )}
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    );
  };

  return (
    <Box sx={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <Typography variant="h4" component="h1" gutterBottom textAlign="center">
        User Management
      </Typography>
      <Box
        component="form"
        onSubmit={handleAddUser}
        sx={{
          marginBottom: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          backgroundColor: '#f7f7f7',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <TextField
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
          required
        />
        <TextField
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          required
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={togglePasswordVisibility}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="Role"
          select
          value={role}
          onChange={(e) => {
            setRole(e.target.value);
            if (e.target.value !== 'Sales') {
              setParentId(null); // Reset parent ID if the role is not Sales
            }
          }}
          fullWidth
          required
        >
          <MenuItem value="General Manager">General Manager</MenuItem>
          <MenuItem value="Head of Sales">Head of Sales</MenuItem>
          <MenuItem value="Sales Operations">Sales Operations</MenuItem>
          <MenuItem value="Team Leader">Team Leader</MenuItem>
          <MenuItem value="Sales">Sales</MenuItem>
        </TextField>

        <TextField
          label="Parent User"
          select
          value={role === 'Sales' ? parentId || 'none' : 'none'} // Show "None" if not Sales
          onChange={(e) => {
            const selectedValue = e.target.value;
            setParentId(selectedValue === 'none' ? null : selectedValue);
          }}
          fullWidth
          disabled={role !== 'Sales'} // Disable if the role is not Sales
        >
          <MenuItem value="none" className='text-slate-700'>None (Top Level)</MenuItem>
          {role === 'Sales' && users.map((user) => (
            <MenuItem key={user._id} value={user._id} className='text-slate-700'>
              {user.username} ({user.role})
            </MenuItem>
          ))}
        </TextField>

        <Button type="submit" variant="contained" color="primary">
          Add User
        </Button>
      </Box>

      <Typography variant="h5" component="h2" gutterBottom textAlign="center">
        Organization Hierarchy
      </Typography>
      <Box sx={{ marginTop: 2 }}>
        {treeData.length > 0 ? renderTree(treeData) : <Typography>No data available</Typography>}
      </Box>

      <Snackbar 
        open={snackbarOpen} 
        autoHideDuration={3000} 
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {dialogAction === 'delete' ? 'Confirm Delete' : 'Change Password'}
        </DialogTitle>
        <DialogContent>
          {dialogAction === 'delete' ? (
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete this user? This action cannot be undone.
            </DialogContentText>
          ) : (
            <TextField
              label="New Password"
              type={showPassword ? 'text' : 'password'}
              value={selectedPassword}
              onChange={(e) => setSelectedPassword(e.target.value)}
              fullWidth
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={togglePasswordVisibility}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmAction} color="primary" autoFocus>
            {dialogAction === 'delete' ? 'Confirm Delete' : 'Confirm Change Password'}
          </Button>
        </DialogActions>
      </Dialog>

      <Box sx={{ marginTop: 2, textAlign: 'center' }}>
        <Button variant="contained" color="secondary" onClick={() => router.push('/dashboard/general-manager')}>
          Return to General Manager Dashboard
        </Button>
      </Box>
    </Box>
  );
};

export default UserManagement;
