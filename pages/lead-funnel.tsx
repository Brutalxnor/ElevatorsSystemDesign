// import React from 'react';
// import { useAuth } from '../contexts/AuthContext';

// const roles = {
//   GeneralManager: {
//     canRead: ['name', 'mobileNumber', 'status', 'feedback', 'assignedSales'],
//     canWrite: ['name', 'mobileNumber', 'status','feedback', 'assignedSales'],
//   },
//   SalesOperations: {
//     canRead: ['name', 'mobileNumber', 'status', 'feedback', 'assignedSales'],
//     canWrite: ['name', 'mobileNumber', 'status', 'assignedSales'],
//   },
//   Sales: {
//     canRead: ['status', 'feedback', 'mobileNumber', 'name'],
//     canWrite: ['feedback'],
//   },
//   HeadOfSales: {
//     canRead: ['name', 'mobileNumber', 'status', 'feedback', 'assignedSales'],
//     canWrite: ['feedback', 'assignedSales'],
//   },
//   TeamLeader: {
//     canRead: ['status', 'feedback', 'mobileNumber', 'name'],
//     canWrite: ['feedback'],
//   },
// };

// interface Lead {
//   name: string;
//   mobileNumber: string;
//   status: string;
//   feedback: string;
//   assignedSales: string;
// }

// const leads: Lead[] = [
//   { name: 'Lead 1', mobileNumber: '123456789', status: 'New', feedback: 'Positive', assignedSales: 'Sales 1' },
//   { name: 'Lead 2', mobileNumber: '987654321', status: 'Contacted', feedback: 'Pending', assignedSales: 'Sales 2' },
//   // Add more leads as needed
// ];

// const LeadFunnel = () => {
//   const { user } = useAuth(); // Get the current user from the AuthContext

//   if (!user) {
//     return <p>Loading...</p>; // Or redirect to login if no user is found
//   }

//   const role = user.role as keyof typeof roles; // Assuming role is one of the keys in `roles`
//   const accessRights = roles[role] || { canRead: [], canWrite: [] }; // Fallback to empty arrays if role is undefined

//   return (
//     <div>
//       <h1>Lead Funnel Info Page</h1>
//       <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
//         <thead>
//           <tr>
//             {accessRights.canRead.includes('name') && <th style={{ border: '1px solid #ddd', padding: '8px' }}>Lead Name</th>}
//             {accessRights.canRead.includes('mobileNumber') && <th style={{ border: '1px solid #ddd', padding: '8px' }}>Lead Mobile Number</th>}
//             {accessRights.canRead.includes('status') && <th style={{ border: '1px solid #ddd', padding: '8px' }}>Lead Status</th>}
//             {accessRights.canRead.includes('feedback') && <th style={{ border: '1px solid #ddd', padding: '8px' }}>Feedback</th>}
//             {accessRights.canRead.includes('assignedSales') && <th style={{ border: '1px solid #ddd', padding: '8px' }}>Assign Lead to Sales</th>}
//           </tr>
//         </thead>
//         <tbody>
//           {leads.map((lead, index) => (
//             <tr key={index}>
//               {accessRights.canRead.includes('name') && (
//                 <td style={{ border: '1px solid #ddd', padding: '8px' }}>
//                   {accessRights.canWrite.includes('name') ? (
//                     <input type="text" defaultValue={lead.name} />
//                   ) : (
//                     lead.name
//                   )}
//                 </td>
//               )}
//               {accessRights.canRead.includes('mobileNumber') && (
//                 <td style={{ border: '1px solid #ddd', padding: '8px' }}>
//                   {accessRights.canWrite.includes('mobileNumber') ? (
//                     <input type="text" defaultValue={lead.mobileNumber} />
//                   ) : (
//                     lead.mobileNumber
//                   )}
//                 </td>
//               )}
//               {accessRights.canRead.includes('status') && (
//                 <td style={{ border: '1px solid #ddd', padding: '8px' }}>
//                   {accessRights.canWrite.includes('status') ? (
//                     <input type="text" defaultValue={lead.status} />
//                   ) : (
//                     lead.status
//                   )}
//                 </td>
//               )}
//               {accessRights.canRead.includes('feedback') && (
//                 <td style={{ border: '1px solid #ddd', padding: '8px' }}>
//                   {accessRights.canWrite.includes('feedback') ? (
//                     <input type="text" defaultValue={lead.feedback} />
//                   ) : (
//                     lead.feedback
//                   )}
//                 </td>
//               )}
//               {accessRights.canRead.includes('assignedSales') && (
//                 <td style={{ border: '1px solid #ddd', padding: '8px' }}>
//                   {accessRights.canWrite.includes('assignedSales') ? (
//                     <input type="text" defaultValue={lead.assignedSales} />
//                   ) : (
//                     lead.assignedSales
//                   )}
//                 </td>
//               )}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default LeadFunnel;







// import React from 'react';
// import { useAuth } from '../contexts/AuthContext';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   TextField,
//   Typography,
// } from '@mui/material';

// const roles = {
//   'General Manager': { // Updated key to match the user role string
//     canRead: ['name', 'mobileNumber', 'status', 'feedback', 'assignedSales'],
//     canWrite: ['name', 'mobileNumber', 'status', 'feedback', 'assignedSales'],
//   },
//   'Sales Operations': { // Updated key to match the user role string
//     canRead: ['name', 'mobileNumber', 'status', 'feedback', 'assignedSales'],
//     canWrite: ['name', 'mobileNumber', 'status', 'assignedSales'],
//   },
//   'Sales': {
//     canRead: ['status', 'feedback', 'mobileNumber', 'name'],
//     canWrite: ['feedback'],
//   },
//   'Head of Sales': { // Updated key to match the user role string
//     canRead: ['name', 'mobileNumber', 'status', 'feedback', 'assignedSales'],
//     canWrite: ['feedback', 'assignedSales'],
//   },
//   'Team Leader': { // Updated key to match the user role string
//     canRead: ['status', 'feedback', 'mobileNumber', 'name'],
//     canWrite: ['feedback'],
//   },
// };

// interface Lead {
//   name: string;
//   mobileNumber: string;
//   status: string;
//   feedback: string;
//   assignedSales: string;
// }

// const leads: Lead[] = [
//   { name: 'Lead 1', mobileNumber: '123456789', status: 'New', feedback: 'Positive', assignedSales: 'nour' },
//   { name: 'Lead 2', mobileNumber: '987654321', status: 'Contacted', feedback: 'Pending', assignedSales: 'Sales 2' },
//   // Add more leads as needed
// ];

// const LeadFunnel = () => {
//   const { user } = useAuth(); // Get the current user from the AuthContext

//   if (!user) {
//     return <Typography>Loading...</Typography>; // Or redirect to login if no user is found
//   }

//   const role = user.role as keyof typeof roles; // Assuming role is one of the keys in `roles`
//   const accessRights = roles[role] || { canRead: [], canWrite: [] }; // Fallback to empty arrays if role is undefined

//   return (
//     <TableContainer component={Paper}>
//       <Typography variant="h4" component="h1" gutterBottom textAlign="center">
//         Lead Funnel Info Page
//       </Typography>
//       <Table>
//         <TableHead>
//           <TableRow>
//             {accessRights.canRead.includes('name') && <TableCell>Lead Name</TableCell>}
//             {accessRights.canRead.includes('mobileNumber') && <TableCell>Lead Mobile Number</TableCell>}
//             {accessRights.canRead.includes('status') && <TableCell>Lead Status</TableCell>}
//             {accessRights.canRead.includes('feedback') && <TableCell>Feedback</TableCell>}
//             {accessRights.canRead.includes('assignedSales') && <TableCell>Assign Lead to Sales</TableCell>}
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {leads.map((lead, index) => (
//             <TableRow key={index}>
//               {accessRights.canRead.includes('name') && (
//                 <TableCell>
//                   {accessRights.canWrite.includes('name') ? (
//                     <TextField
//                       variant="outlined"
//                       defaultValue={lead.name}
//                       fullWidth
//                       InputProps={{
//                         style: {
//                           backgroundColor: '#f5f5f5', // Match background color
//                         },
//                       }}
//                     />
//                   ) : (
//                     lead.name
//                   )}
//                 </TableCell>
//               )}
//               {accessRights.canRead.includes('mobileNumber') && (
//                 <TableCell>
//                   {accessRights.canWrite.includes('mobileNumber') ? (
//                     <TextField
//                       variant="outlined"
//                       defaultValue={lead.mobileNumber}
//                       fullWidth
//                       InputProps={{
//                         style: {
//                           backgroundColor: '#f5f5f5', // Match background color
//                         },
//                       }}
//                     />
//                   ) : (
//                     lead.mobileNumber
//                   )}
//                 </TableCell>
//               )}
//               {accessRights.canRead.includes('status') && (
//                 <TableCell>
//                   {accessRights.canWrite.includes('status') ? (
//                     <TextField
//                       variant="outlined"
//                       defaultValue={lead.status}
//                       fullWidth
//                       InputProps={{
//                         style: {
//                           backgroundColor: '#f5f5f5', // Match background color
//                         },
//                       }}
//                     />
//                   ) : (
//                     lead.status
//                   )}
//                 </TableCell>
//               )}
//               {accessRights.canRead.includes('feedback') && (
//                 <TableCell>
//                   {accessRights.canWrite.includes('feedback') ? (
//                     <TextField
//                       variant="outlined"
//                       defaultValue={lead.feedback}
//                       fullWidth
//                       InputProps={{
//                         style: {
//                           backgroundColor: '#f5f5f5', // Match background color
//                         },
//                       }}
//                     />
//                   ) : (
//                     lead.feedback
//                   )}
//                 </TableCell>
//               )}
//               {accessRights.canRead.includes('assignedSales') && (
//                 <TableCell>
//                   {accessRights.canWrite.includes('assignedSales') ? (
//                     <TextField
//                       variant="outlined"
//                       defaultValue={lead.assignedSales}
//                       fullWidth
//                       InputProps={{
//                         style: {
//                           backgroundColor: '#f5f5f5', // Match background color
//                         },
//                       }}
//                     />
//                   ) : (
//                     lead.assignedSales
//                   )}
//                 </TableCell>
//               )}
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// };

// export default LeadFunnel;















// import React, { useState, useEffect } from 'react';
// import { useAuth } from '../contexts/AuthContext';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   TextField,
//   Typography,
//   MenuItem,
//   Select,
//   Button,
// } from '@mui/material';

// const roles = {
//   'General Manager': {
//     canRead: ['name', 'mobileNumber', 'status', 'feedback', 'assignedSales'],
//     canWrite: ['name', 'mobileNumber', 'status', 'feedback', 'assignedSales'],
//   },
//   'Sales Operations': {
//     canRead: ['name', 'mobileNumber', 'status', 'feedback', 'assignedSales'],
//     canWrite: ['name', 'mobileNumber', 'status', 'assignedSales'],
//   },
//   Sales: {
//     canRead: ['status', 'feedback', 'mobileNumber', 'name'],
//     canWrite: ['feedback'],
//   },
//   'Head of Sales': {
//     canRead: ['name', 'mobileNumber', 'status', 'feedback', 'assignedSales'],
//     canWrite: ['feedback', 'assignedSales'],
//   },
//   'Team Leader': {
//     canRead: ['status', 'feedback', 'mobileNumber', 'name'],
//     canWrite: ['feedback'],
//   },
// };

// interface Lead {
//   _id?: string;
//   name: string;
//   mobileNumber: string;
//   status: string;
//   feedback: string;
//   assignedSales: string;
// }

// const LeadFunnel = () => {
//   const { user } = useAuth();
//   const [leads, setLeads] = useState<Lead[]>([]);
//   const [salesPeople, setSalesPeople] = useState<string[]>([]);

//   useEffect(() => {
//     // Fetch leads from the database
//     const fetchLeads = async () => {
//       const response = await fetch('/api/get-leads');
//       const data = await response.json();
//       setLeads(data.leads);
//     };

//     // Fetch salespeople from the database
//     const fetchSalesPeople = async () => {
//       const response = await fetch('/api/get-sales-people');
//       const data = await response.json();
//       setSalesPeople(data.salesPeople);
//     };

//     fetchLeads();
//     fetchSalesPeople();
//   }, []);

//   if (!user) {
//     return <Typography>Loading...</Typography>;
//   }

//   const role = user.role as keyof typeof roles;
//   const accessRights = roles[role] || { canRead: [], canWrite: [] };

//   const handleSave = async (lead: Lead) => {
//     const response = await fetch('/api/save-lead', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(lead),
//     });

//     if (response.ok) {
//       alert('Lead saved successfully');
//     } else {
//       alert('Failed to save lead');
//     }
//   };

//   const handleChange = (lead: Lead, field: keyof Lead, value: string) => {
//     const updatedLeads = leads.map((l) =>
//       l._id === lead._id ? { ...l, [field]: value } : l
//     );
//     setLeads(updatedLeads);
//   };

//   return (
//     <TableContainer component={Paper}>
//       <Typography variant="h4" component="h1" gutterBottom textAlign="center">
//         Lead Funnel Info Page
//       </Typography>
//       <Table>
//         <TableHead>
//           <TableRow>
//             {accessRights.canRead.includes('name') && <TableCell>Lead Name</TableCell>}
//             {accessRights.canRead.includes('mobileNumber') && <TableCell>Lead Mobile Number</TableCell>}
//             {accessRights.canRead.includes('status') && <TableCell>Lead Status</TableCell>}
//             {accessRights.canRead.includes('feedback') && <TableCell>Feedback</TableCell>}
//             {accessRights.canRead.includes('assignedSales') && <TableCell>Assign Lead to Sales</TableCell>}
//             {accessRights.canWrite.length > 0 && <TableCell>Actions</TableCell>}
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {leads.map((lead, index) => (
//             <TableRow key={index}>
//               {accessRights.canRead.includes('name') && (
//                 <TableCell>
//                   {accessRights.canWrite.includes('name') ? (
//                     <TextField
//                       variant="outlined"
//                       value={lead.name}
//                       onChange={(e) => handleChange(lead, 'name', e.target.value)}
//                       fullWidth
//                       InputProps={{
//                         style: {
//                           backgroundColor: '#f5f5f5',
//                         },
//                       }}
//                     />
//                   ) : (
//                     lead.name
//                   )}
//                 </TableCell>
//               )}
//               {accessRights.canRead.includes('mobileNumber') && (
//                 <TableCell>
//                   {accessRights.canWrite.includes('mobileNumber') ? (
//                     <TextField
//                       variant="outlined"
//                       value={lead.mobileNumber}
//                       onChange={(e) => handleChange(lead, 'mobileNumber', e.target.value)}
//                       fullWidth
//                       InputProps={{
//                         style: {
//                           backgroundColor: '#f5f5f5',
//                         },
//                       }}
//                     />
//                   ) : (
//                     lead.mobileNumber
//                   )}
//                 </TableCell>
//               )}
//               {accessRights.canRead.includes('status') && (
//                 <TableCell>
//                   {accessRights.canWrite.includes('status') ? (
//                     <TextField
//                       variant="outlined"
//                       value={lead.status}
//                       onChange={(e) => handleChange(lead, 'status', e.target.value)}
//                       fullWidth
//                       InputProps={{
//                         style: {
//                           backgroundColor: '#f5f5f5',
//                         },
//                       }}
//                     />
//                   ) : (
//                     lead.status
//                   )}
//                 </TableCell>
//               )}
//               {accessRights.canRead.includes('feedback') && (
//                 <TableCell>
//                   {accessRights.canWrite.includes('feedback') ? (
//                     <TextField
//                       variant="outlined"
//                       value={lead.feedback}
//                       onChange={(e) => handleChange(lead, 'feedback', e.target.value)}
//                       fullWidth
//                       InputProps={{
//                         style: {
//                           backgroundColor: '#f5f5f5',
//                         },
//                       }}
//                     />
//                   ) : (
//                     lead.feedback
//                   )}
//                 </TableCell>
//               )}
//               {accessRights.canRead.includes('assignedSales') && (
//                 <TableCell>
//                   {accessRights.canWrite.includes('assignedSales') ? (
//                     <Select
//                       value={lead.assignedSales}
//                       onChange={(e) => handleChange(lead, 'assignedSales', e.target.value)}
//                       fullWidth
//                     >
//                       {salesPeople.map((salesPerson) => (
//                         <MenuItem key={salesPerson} value={salesPerson}>
//                           {salesPerson}
//                         </MenuItem>
//                       ))}
//                     </Select>
//                   ) : (
//                     lead.assignedSales
//                   )}
//                 </TableCell>
//               )}
//               {accessRights.canWrite.length > 0 && (
//                 <TableCell>
//                   <Button
//                     variant="contained"
//                     color="primary"
//                     onClick={() => handleSave(lead)}
//                   >
//                     Save
//                   </Button>
//                 </TableCell>
//               )}
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// };

// export default LeadFunnel;

















// import React, { useState, useEffect } from 'react';
// import { useAuth } from '../contexts/AuthContext';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   TextField,
//   Typography,
//   MenuItem,
//   Select,
//   Button,
//   Box,
// } from '@mui/material';
// import { useRouter } from 'next/router';

// const roles = {
//   'General Manager': {
//     canRead: ['name', 'mobileNumber', 'status', 'feedback', 'assignedSales'],
//     canWrite: ['name', 'mobileNumber', 'status', 'feedback', 'assignedSales'],
//   },
//   'Sales Operations': {
//     canRead: ['name', 'mobileNumber', 'status', 'feedback', 'assignedSales'],
//     canWrite: ['name', 'mobileNumber', 'status', 'assignedSales'],
//   },
//   Sales: {
//     canRead: ['status', 'feedback', 'mobileNumber', 'name'],
//     canWrite: ['feedback'],
//   },
//   'Head of Sales': {
//     canRead: ['name', 'mobileNumber', 'status', 'feedback', 'assignedSales'],
//     canWrite: ['feedback', 'assignedSales'],
//   },
//   'Team Leader': {
//     canRead: ['status', 'feedback', 'mobileNumber', 'name'],
//     canWrite: ['feedback'],
//   },
// };

// interface Lead {
//   _id?: string;
//   name: string;
//   mobileNumber: string;
//   status: string;
//   feedback: string;
//   assignedSales: string;
// }

// const LeadFunnel = () => {
//   const { user } = useAuth();
//   const [leads, setLeads] = useState<Lead[]>([]);
//   const [salesPeople, setSalesPeople] = useState<string[]>([]);
//   const router = useRouter();

//   useEffect(() => {
//     // Fetch leads from the database
//     const fetchLeads = async () => {
//       const response = await fetch('/api/get-leads');
//       const data = await response.json();
//       setLeads(data.leads);
//     };

//     // Fetch salespeople from the database
//     const fetchSalesPeople = async () => {
//       const response = await fetch('/api/get-sales-people');
//       const data = await response.json();
//       setSalesPeople(data.salesPeople);
//     };

//     fetchLeads();
//     fetchSalesPeople();
//   }, []);

//   if (!user) {
//     return <Typography>Loading...</Typography>;
//   }

//   const role = user.role as keyof typeof roles;
//   const accessRights = roles[role] || { canRead: [], canWrite: [] };

//   const handleSave = async (lead: Lead) => {
//     const response = await fetch('/api/save-lead', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(lead),
//     });

//     if (response.ok) {
//       alert('Lead saved successfully');
//       const updatedLeads = await (await fetch('/api/get-leads')).json();
//       setLeads(updatedLeads.leads);
//     } else {
//       alert('Failed to save lead');
//     }
//   };

//   const handleChange = (lead: Lead, field: keyof Lead, value: string) => {
//     const updatedLeads = leads.map((l) =>
//       l._id === lead._id ? { ...l, [field]: value } : l
//     );
//     setLeads(updatedLeads);
//   };

//   const handleAddLead = () => {
//     setLeads([
//       ...leads,
//       { name: '', mobileNumber: '', status: '', feedback: '', assignedSales: '' },
//     ]);
//   };

//   const handleBackToDashboard = () => {
//     if (role === 'General Manager') {
//       router.push('/dashboard/general-manager');
//     } else if (role === 'Sales Operations') {
//       router.push('/dashboard/sales-operations');
//     } else if (role === 'Sales') {
//       router.push('/dashboard/sales');
//     } else if (role === 'Head of Sales') {
//       router.push('/dashboard/head-of-sales');
//     } else if (role === 'Team Leader') {
//       router.push('/dashboard/team-leader');
//     }
//   };

//   return (
//     <Box>
//       <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
//         <Typography variant="h4" component="h1">
//           Lead Funnel Info Page
//         </Typography>
//         <Button variant="contained" onClick={handleBackToDashboard}>
//           Back to Dashboard
//         </Button>
//       </Box>
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               {accessRights.canRead.includes('name') && <TableCell>Lead Name</TableCell>}
//               {accessRights.canRead.includes('mobileNumber') && <TableCell>Lead Mobile Number</TableCell>}
//               {accessRights.canRead.includes('status') && <TableCell>Lead Status</TableCell>}
//               {accessRights.canRead.includes('feedback') && <TableCell>Feedback</TableCell>}
//               {accessRights.canRead.includes('assignedSales') && <TableCell>Assign Lead to Sales</TableCell>}
//               {accessRights.canWrite.length > 0 && <TableCell>Actions</TableCell>}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {leads.map((lead, index) => (
//               <TableRow key={index}>
//                 {accessRights.canRead.includes('name') && (
//                   <TableCell>
//                     {accessRights.canWrite.includes('name') ? (
//                       <TextField
//                         variant="outlined"
//                         value={lead.name}
//                         onChange={(e) => handleChange(lead, 'name', e.target.value)}
//                         fullWidth
//                         InputProps={{
//                           style: {
//                             backgroundColor: '#f5f5f5',
//                           },
//                         }}
//                       />
//                     ) : (
//                       lead.name
//                     )}
//                   </TableCell>
//                 )}
//                 {accessRights.canRead.includes('mobileNumber') && (
//                   <TableCell>
//                     {accessRights.canWrite.includes('mobileNumber') ? (
//                       <TextField
//                         variant="outlined"
//                         value={lead.mobileNumber}
//                         onChange={(e) => handleChange(lead, 'mobileNumber', e.target.value)}
//                         fullWidth
//                         InputProps={{
//                           style: {
//                             backgroundColor: '#f5f5f5',
//                           },
//                         }}
//                       />
//                     ) : (
//                       lead.mobileNumber
//                     )}
//                   </TableCell>
//                 )}
//                 {accessRights.canRead.includes('status') && (
//                   <TableCell>
//                     {accessRights.canWrite.includes('status') ? (
//                       <TextField
//                         variant="outlined"
//                         value={lead.status}
//                         onChange={(e) => handleChange(lead, 'status', e.target.value)}
//                         fullWidth
//                         InputProps={{
//                           style: {
//                             backgroundColor: '#f5f5f5',
//                           },
//                         }}
//                       />
//                     ) : (
//                       lead.status
//                     )}
//                   </TableCell>
//                 )}
//                 {accessRights.canRead.includes('feedback') && (
//                   <TableCell>
//                     {accessRights.canWrite.includes('feedback') ? (
//                       <TextField
//                         variant="outlined"
//                         value={lead.feedback}
//                         onChange={(e) => handleChange(lead, 'feedback', e.target.value)}
//                         fullWidth
//                         InputProps={{
//                           style: {
//                             backgroundColor: '#f5f5f5',
//                           },
//                         }}
//                       />
//                     ) : (
//                       lead.feedback
//                     )}
//                   </TableCell>
//                 )}
//                 {accessRights.canRead.includes('assignedSales') && (
//                   <TableCell>
//                     {accessRights.canWrite.includes('assignedSales') ? (
//                       <Select
//                         value={lead.assignedSales}
//                         onChange={(e) => handleChange(lead, 'assignedSales', e.target.value)}
//                         fullWidth
//                       >
//                         {salesPeople.map((salesPerson) => (
//                           <MenuItem key={salesPerson} value={salesPerson}>
//                             {salesPerson}
//                           </MenuItem>
//                         ))}
//                       </Select>
//                     ) : (
//                       lead.assignedSales
//                     )}
//                   </TableCell>
//                 )}
//                 {accessRights.canWrite.length > 0 && (
//                   <TableCell>
//                     <Button
//                       variant="contained"
//                       color="primary"
//                       onClick={() => handleSave(lead)}
//                     >
//                       Save
//                     </Button>
//                   </TableCell>
//                 )}
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       {accessRights.canWrite.length === 5 && ( // All fields can be written
//         <Box sx={{ marginTop: 2 }}>
//           <Button variant="contained" color="secondary" onClick={handleAddLead}>
//             Add Lead
//           </Button>
//         </Box>
//       )}
//     </Box>
//   );
// };

// export default LeadFunnel;



////



// import React, { useState, useEffect } from 'react';
// import { useAuth } from '../contexts/AuthContext';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   TextField,
//   Typography,
//   MenuItem,
//   Select,
//   Button,
//   Box,
//   Snackbar,
//   Alert,
// } from '@mui/material';
// import { useRouter } from 'next/router';

// const roles = {
//   'General Manager': {
//     canRead: ['name', 'mobileNumber', 'status', 'feedback', 'assignedSales'],
//     canWrite: ['name', 'mobileNumber', 'status', 'feedback', 'assignedSales'],
//   },
//   'Sales Operations': {
//     canRead: ['name', 'mobileNumber', 'status', 'feedback', 'assignedSales'],
//     canWrite: ['name', 'mobileNumber', 'status', 'assignedSales'],
//   },
//   Sales: {
//     canRead: ['status', 'feedback', 'mobileNumber', 'name'],
//     canWrite: ['feedback'],
//   },
//   'Head of Sales': {
//     canRead: ['name', 'mobileNumber', 'status', 'feedback', 'assignedSales'],
//     canWrite: ['feedback', 'assignedSales'],
//   },
//   'Team Leader': {
//     canRead: ['status', 'feedback', 'mobileNumber', 'name'],
//     canWrite: ['feedback'],
//   },
// };

// interface Lead {
//   _id?: string;
//   name: string;
//   mobileNumber: string;
//   status: string;
//   feedback: string;
//   assignedSales: string;
// }

// const LeadFunnel = () => {
//   const { user } = useAuth();
//   const [leads, setLeads] = useState<Lead[]>([]);
//   const [salesPeople, setSalesPeople] = useState<string[]>([]);
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState('');
//   const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
//   const router = useRouter();

//   useEffect(() => {
//     // Fetch leads from the database
//     const fetchLeads = async () => {
//       const response = await fetch('/api/get-leads');
//       const data = await response.json();
//       setLeads(data.leads);
//     };

//     // Fetch salespeople from the database
//     const fetchSalesPeople = async () => {
//       const response = await fetch('/api/get-sales-people');
//       const data = await response.json();
//       setSalesPeople(data.salesPeople);
//     };

//     fetchLeads();
//     fetchSalesPeople();
//   }, []);

//   if (!user) {
//     return <Typography>Loading...</Typography>;
//   }

//   const role = user.role as keyof typeof roles;
//   const accessRights = roles[role] || { canRead: [], canWrite: [] };

//   const handleSave = async (lead: Lead) => {
//     const response = await fetch('/api/save-lead', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(lead),
//     });

//     if (response.ok) {
//       setSnackbarMessage('Lead saved successfully');
//       setSnackbarSeverity('success');
//       setSnackbarOpen(true);
//       const updatedLeads = await (await fetch('/api/get-leads')).json();
//       setLeads(updatedLeads.leads);
//     } else {
//       setSnackbarMessage('Failed to save lead');
//       setSnackbarSeverity('error');
//       setSnackbarOpen(true);
//     }
//   };

//   const handleChange = (lead: Lead, field: keyof Lead, value: string) => {
//     const updatedLeads = leads.map((l) =>
//       l._id === lead._id ? { ...l, [field]: value } : l
//     );
//     setLeads(updatedLeads);
//   };

//   const handleAddLead = () => {
//     setLeads([
//       ...leads,
//       { name: '', mobileNumber: '', status: '', feedback: '', assignedSales: '' },
//     ]);
//   };

//   const handleBackToDashboard = () => {
//     if (role === 'General Manager') {
//       router.push('/dashboard/general-manager');
//     } else if (role === 'Sales Operations') {
//       router.push('/dashboard/sales-operations');
//     } else if (role === 'Sales') {
//       router.push('/dashboard/sales');
//     } else if (role === 'Head of Sales') {
//       router.push('/dashboard/head-of-sales');
//     } else if (role === 'Team Leader') {
//       router.push('/dashboard/team-leader');
//     }
//   };

//   const handleCloseSnackbar = () => {
//     setSnackbarOpen(false);
//   };

//   return (
//     <Box>
//       <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
//         <Typography variant="h4" component="h1">
//           Lead Funnel Info Page
//         </Typography>
//         <Button variant="contained" onClick={handleBackToDashboard}>
//           Back to Dashboard
//         </Button>
//       </Box>
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               {accessRights.canRead.includes('name') && <TableCell>Lead Name</TableCell>}
//               {accessRights.canRead.includes('mobileNumber') && <TableCell>Lead Mobile Number</TableCell>}
//               {accessRights.canRead.includes('status') && <TableCell>Lead Status</TableCell>}
//               {accessRights.canRead.includes('feedback') && <TableCell>Feedback</TableCell>}
//               {accessRights.canRead.includes('assignedSales') && <TableCell>Assign Lead to Sales</TableCell>}
//               {accessRights.canWrite.length > 0 && <TableCell>Actions</TableCell>}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {leads.map((lead, index) => (
//               <TableRow key={index}>
//                 {accessRights.canRead.includes('name') && (
//                   <TableCell>
//                     {accessRights.canWrite.includes('name') ? (
//                       <TextField
//                         variant="outlined"
//                         value={lead.name}
//                         onChange={(e) => handleChange(lead, 'name', e.target.value)}
//                         fullWidth
//                         InputProps={{
//                           style: {
//                             backgroundColor: '#f5f5f5',
//                           },
//                         }}
//                       />
//                     ) : (
//                       lead.name
//                     )}
//                   </TableCell>
//                 )}
//                 {accessRights.canRead.includes('mobileNumber') && (
//                   <TableCell>
//                     {accessRights.canWrite.includes('mobileNumber') ? (
//                       <TextField
//                         variant="outlined"
//                         value={lead.mobileNumber}
//                         onChange={(e) => handleChange(lead, 'mobileNumber', e.target.value)}
//                         fullWidth
//                         InputProps={{
//                           style: {
//                             backgroundColor: '#f5f5f5',
//                           },
//                         }}
//                       />
//                     ) : (
//                       lead.mobileNumber
//                     )}
//                   </TableCell>
//                 )}
//                 {accessRights.canRead.includes('status') && (
//                   <TableCell>
//                     {accessRights.canWrite.includes('status') ? (
//                       <TextField
//                         variant="outlined"
//                         value={lead.status}
//                         onChange={(e) => handleChange(lead, 'status', e.target.value)}
//                         fullWidth
//                         InputProps={{
//                           style: {
//                             backgroundColor: '#f5f5f5',
//                           },
//                         }}
//                       />
//                     ) : (
//                       lead.status
//                     )}
//                   </TableCell>
//                 )}
//                 {accessRights.canRead.includes('feedback') && (
//                   <TableCell>
//                     {accessRights.canWrite.includes('feedback') ? (
//                       <TextField
//                         variant="outlined"
//                         value={lead.feedback}
//                         onChange={(e) => handleChange(lead, 'feedback', e.target.value)}
//                         fullWidth
//                         InputProps={{
//                           style: {
//                             backgroundColor: '#f5f5f5',
//                           },
//                         }}
//                       />
//                     ) : (
//                       lead.feedback
//                     )}
//                   </TableCell>
//                 )}
//                 {accessRights.canRead.includes('assignedSales') && (
//                   <TableCell>
//                     {accessRights.canWrite.includes('assignedSales') ? (
//                       <Select
//                         value={lead.assignedSales}
//                         onChange={(e) => handleChange(lead, 'assignedSales', e.target.value)}
//                         fullWidth
//                       >
//                         {salesPeople.map((salesPerson) => (
//                           <MenuItem key={salesPerson} value={salesPerson}>
//                             {salesPerson}
//                           </MenuItem>
//                         ))}
//                       </Select>
//                     ) : (
//                       lead.assignedSales
//                     )}
//                   </TableCell>
//                 )}
//                 {accessRights.canWrite.length > 0 && (
//                   <TableCell>
//                     <Button
//                       variant="contained"
//                       color="primary"
//                       onClick={() => handleSave(lead)}
//                     >
//                       Save
//                     </Button>
//                   </TableCell>
//                 )}
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       {accessRights.canWrite.length === 5 && ( // All fields can be written
//         <Box sx={{ marginTop: 2 }}>
//           <Button variant="contained" color="secondary" onClick={handleAddLead}>
//             Add Lead
//           </Button>
//         </Box>
//       )}

//       <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={3000}
//         onClose={handleCloseSnackbar}
//       >
//         <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
//           {snackbarMessage}
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// };

// export default LeadFunnel;







// import React, { useState, useEffect } from 'react';
// import { useAuth } from '../contexts/AuthContext';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   TextField,
//   Typography,
//   MenuItem,
//   Select,
//   Button,
//   Box,
//   Snackbar,
//   Alert,
// } from '@mui/material';
// import { useRouter } from 'next/router';

// const roles = {
//   'General Manager': {
//     canRead: ['name', 'mobileNumber', 'status', 'feedback', 'assignedSales'],
//     canWrite: ['name', 'mobileNumber', 'status', 'feedback', 'assignedSales'],
//   },
//   'Sales Operations': {
//     canRead: ['name', 'mobileNumber', 'status', 'feedback', 'assignedSales'],
//     canWrite: ['name', 'mobileNumber', 'status', 'assignedSales'],
//   },
//   Sales: {
//     canRead: ['status', 'feedback', 'mobileNumber', 'name'],
//     canWrite: ['feedback'],
//   },
//   'Head of Sales': {
//     canRead: ['name', 'mobileNumber', 'status', 'feedback', 'assignedSales'],
//     canWrite: ['feedback', 'assignedSales'],
//   },
//   'Team Leader': {
//     canRead: ['status', 'feedback', 'mobileNumber', 'name'],
//     canWrite: ['feedback'],
//   },
// };

// interface Lead {
//   _id?: string;
//   name: string;
//   mobileNumber: string;
//   status: string;
//   feedback: string;
//   assignedSales: string;
// }

// const LeadFunnel = () => {
//   const { user } = useAuth();
//   const [leads, setLeads] = useState<Lead[]>([]);
//   const [salesPeople, setSalesPeople] = useState<string[]>([]);
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState('');
//   const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
//   const router = useRouter();

//   useEffect(() => {
//     // Fetch leads from the database
//     const fetchLeads = async () => {
//       const response = await fetch('/api/get-leads');
//       const data = await response.json();
//       setLeads(data.leads);
//     };

//     // Fetch salespeople from the database
//     const fetchSalesPeople = async () => {
//       const response = await fetch('/api/get-sales-people');
//       const data = await response.json();
//       setSalesPeople(data.salesPeople);
//     };

//     fetchLeads();
//     fetchSalesPeople();
//   }, []);

//   if (!user) {
//     return <Typography>Loading...</Typography>;
//   }

//   const role = user.role as keyof typeof roles;
//   const accessRights = roles[role] || { canRead: [], canWrite: [] };

//   // Filter leads based on the logged-in user's role and assigned sales
//   const filteredLeads = leads.filter((lead) => {
//     if (role === 'Sales') {
//       return lead.assignedSales === user.username; // Only show leads assigned to the logged-in salesperson
//     }
//     return true; // Other roles can see all leads
//   });

//   const handleSave = async (lead: Lead) => {
//     const response = await fetch('/api/save-lead', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(lead),
//     });

//     if (response.ok) {
//       setSnackbarMessage('Lead saved successfully');
//       setSnackbarSeverity('success');
//       setSnackbarOpen(true);
//       const updatedLeads = await (await fetch('/api/get-leads')).json();
//       setLeads(updatedLeads.leads);
//     } else {
//       setSnackbarMessage('Failed to save lead');
//       setSnackbarSeverity('error');
//       setSnackbarOpen(true);
//     }
//   };

//   const handleChange = (lead: Lead, field: keyof Lead, value: string) => {
//     const updatedLeads = leads.map((l) =>
//       l._id === lead._id ? { ...l, [field]: value } : l
//     );
//     setLeads(updatedLeads);
//   };

//   const handleAddLead = () => {
//     setLeads([
//       ...leads,
//       { name: '', mobileNumber: '', status: '', feedback: '', assignedSales: '' },
//     ]);
//   };

//   const handleBackToDashboard = () => {
//     if (role === 'General Manager') {
//       router.push('/dashboard/general-manager');
//     } else if (role === 'Sales Operations') {
//       router.push('/dashboard/sales-operations');
//     } else if (role === 'Sales') {
//       router.push('/dashboard/sales');
//     } else if (role === 'Head of Sales') {
//       router.push('/dashboard/head-of-sales');
//     } else if (role === 'Team Leader') {
//       router.push('/dashboard/team-leader');
//     }
//   };

//   const handleCloseSnackbar = () => {
//     setSnackbarOpen(false);
//   };

//   return (
//     <Box>
//       <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
//         <Typography variant="h4" component="h1">
//           Lead Funnel Info Page
//         </Typography>
//         <Button variant="contained" onClick={handleBackToDashboard}>
//           Back to Dashboard
//         </Button>
//       </Box>
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               {accessRights.canRead.includes('name') && <TableCell>Lead Name</TableCell>}
//               {accessRights.canRead.includes('mobileNumber') && <TableCell>Lead Mobile Number</TableCell>}
//               {accessRights.canRead.includes('status') && <TableCell>Lead Status</TableCell>}
//               {accessRights.canRead.includes('feedback') && <TableCell>Feedback</TableCell>}
//               {accessRights.canRead.includes('assignedSales') && <TableCell>Assign Lead to Sales</TableCell>}
//               {accessRights.canWrite.length > 0 && <TableCell>Actions</TableCell>}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {filteredLeads.map((lead, index) => (
//               <TableRow key={index}>
//                 {accessRights.canRead.includes('name') && (
//                   <TableCell>
//                     {accessRights.canWrite.includes('name') ? (
//                       <TextField
//                         variant="outlined"
//                         value={lead.name}
//                         onChange={(e) => handleChange(lead, 'name', e.target.value)}
//                         fullWidth
//                         InputProps={{
//                           style: {
//                             backgroundColor: '#f5f5f5',
//                           },
//                         }}
//                       />
//                     ) : (
//                       lead.name
//                     )}
//                   </TableCell>
//                 )}
//                 {accessRights.canRead.includes('mobileNumber') && (
//                   <TableCell>
//                     {accessRights.canWrite.includes('mobileNumber') ? (
//                       <TextField
//                         variant="outlined"
//                         value={lead.mobileNumber}
//                         onChange={(e) => handleChange(lead, 'mobileNumber', e.target.value)}
//                         fullWidth
//                         InputProps={{
//                           style: {
//                             backgroundColor: '#f5f5f5',
//                           },
//                         }}
//                       />
//                     ) : (
//                       lead.mobileNumber
//                     )}
//                   </TableCell>
//                 )}
//                 {accessRights.canRead.includes('status') && (
//                   <TableCell>
//                     {accessRights.canWrite.includes('status') ? (
//                       <TextField
//                         variant="outlined"
//                         value={lead.status}
//                         onChange={(e) => handleChange(lead, 'status', e.target.value)}
//                         fullWidth
//                         InputProps={{
//                           style: {
//                             backgroundColor: '#f5f5f5',
//                           },
//                         }}
//                       />
//                     ) : (
//                       lead.status
//                     )}
//                   </TableCell>
//                 )}
//                 {accessRights.canRead.includes('feedback') && (
//                   <TableCell>
//                     {accessRights.canWrite.includes('feedback') ? (
//                       <TextField
//                         variant="outlined"
//                         value={lead.feedback}
//                         onChange={(e) => handleChange(lead, 'feedback', e.target.value)}
//                         fullWidth
//                         InputProps={{
//                           style: {
//                             backgroundColor: '#f5f5f5',
//                           },
//                         }}
//                       />
//                     ) : (
//                       lead.feedback
//                     )}
//                   </TableCell>
//                 )}
//                 {accessRights.canRead.includes('assignedSales') && (
//                   <TableCell>
//                     {accessRights.canWrite.includes('assignedSales') ? (
//                       <Select
//                         value={lead.assignedSales}
//                         onChange={(e) => handleChange(lead, 'assignedSales', e.target.value)}
//                         fullWidth
//                       >
//                         {salesPeople.map((salesPerson) => (
//                           <MenuItem key={salesPerson} value={salesPerson}>
//                             {salesPerson}
//                           </MenuItem>
//                         ))}
//                       </Select>
//                     ) : (
//                       lead.assignedSales
//                     )}
//                   </TableCell>
//                 )}
//                 {accessRights.canWrite.length > 0 && (
//                   <TableCell>
//                     <Button
//                       variant="contained"
//                       color="primary"
//                       onClick={() => handleSave(lead)}
//                     >
//                       Save
//                     </Button>
//                   </TableCell>
//                 )}
//               </TableRow>
//             ))}
//             {accessRights.canWrite.length === 5 && (
//               <TableRow>
//                 <TableCell colSpan={6} align="center">
//                   <Button variant="outlined" color="primary" onClick={handleAddLead}>
//                     Add New Lead
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={3000}
//         onClose={handleCloseSnackbar}
//       >
//         <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
//           {snackbarMessage}
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// };

// export default LeadFunnel;













/////// best   /////////


// import React, { useState, useEffect } from 'react';
// import { useAuth } from '../contexts/AuthContext';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   TextField,
//   Typography,
//   MenuItem,
//   Select,
//   Button,
//   Box,
//   Snackbar,
//   Alert,
// } from '@mui/material';
// import { useRouter } from 'next/router';

// const roles = {
//   'General Manager': {
//     canRead: ['name', 'mobileNumber', 'status', 'feedback', 'assignedSales'],
//     canWrite: ['name', 'mobileNumber', 'status', 'feedback', 'assignedSales'],
//   },
//   'Sales Operations': {
//     canRead: ['name', 'mobileNumber', 'status', 'feedback', 'assignedSales'],
//     canWrite: ['name', 'mobileNumber', 'status', 'assignedSales'],
//   },
//   Sales: {
//     canRead: ['status', 'feedback', 'mobileNumber', 'name'],
//     canWrite: ['feedback'],
//   },
//   'Head of Sales': {
//     canRead: ['name', 'mobileNumber', 'status', 'feedback', 'assignedSales'],
//     canWrite: ['feedback', 'assignedSales'],
//   },
//   'Team Leader': {
//     canRead: ['name', 'mobileNumber', 'status', 'feedback', 'assignedSales'],
//     canWrite: ['feedback'],
//   },
// };

// interface Lead {
//   _id?: string;
//   name: string;
//   mobileNumber: string;
//   status: string;
//   feedback: string;
//   assignedSales: string;
// }

// interface SalesPerson {
//   _id: string;
//   username: string;
//   parentId: string | null;
// }


// const LeadFunnel = () => {
//   const { user } = useAuth();
//   const [leads, setLeads] = useState<Lead[]>([]);
//   const [salesPeople, setSalesPeople] = useState<SalesPerson[]>([]);
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState('');
//   const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
//   const [loading, setLoading] = useState(true);
//   const router = useRouter();

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const [leadsResponse, salesPeopleResponse] = await Promise.all([
//           fetch('/api/get-leads'),
//           fetch('/api/get-sales-people'),
//         ]);
  
//         const leadsData = await leadsResponse.json();
//         const salesPeopleData = await salesPeopleResponse.json();
  
//         setLeads(leadsData.leads);
//         setSalesPeople(salesPeopleData.salesPeopleAndLeaders || []);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };
  
//     fetchData();
//   }, []);
  

//   if (!user || !user._id) {
//     console.log('User or User ID is missing:', user); // Debugging
//     return <Typography>Loading...</Typography>;
//   }
  
//   const role = user.role as keyof typeof roles;
//   const accessRights = roles[role] || { canRead: [], canWrite: [] };
  
//   // Filter leads based on the user's role
//   const filteredLeads = leads.filter((lead) => {
//     if (role === 'Sales') {
//       // Sales role: Show leads only assigned to this specific salesperson
//       return lead.assignedSales === user.username;
//     }
  
//     if (role === 'Team Leader') {
//       // Team Leader role: Show leads assigned to their team and to themselves
//       const managedSalesPeople = salesPeople?.filter(salesPerson => salesPerson.parentId === user._id);
//       console.log(user._id, "userID"); // Debug log with the correct property
//       console.log(managedSalesPeople, "Managed Sales People");
//       console.log(salesPeople?.filter(salesPerson => salesPerson.parentId), "parentId");
  
//       // Include leads assigned to the team leader and any of their managed salespeople
//       return lead.assignedSales === user.username || managedSalesPeople.some(salesPerson => salesPerson.username === lead.assignedSales);
//     }
  
//     // For other roles (e.g., General Manager, Sales Operations, Head of Sales): Show all leads
//     return true;
//   });
  
//   const handleSave = async (lead: Lead) => {
//     const response = await fetch('/api/save-lead', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(lead),
//     });

//     if (response.ok) {
//       setSnackbarMessage('Lead saved successfully');
//       setSnackbarSeverity('success');
//       setSnackbarOpen(true);
//       const updatedLeads = await (await fetch('/api/get-leads')).json();
//       setLeads(updatedLeads.leads);
//     } else {
//       setSnackbarMessage('Failed to save lead');
//       setSnackbarSeverity('error');
//       setSnackbarOpen(true);
//     }
//   };

//   const handleChange = (lead: Lead, field: keyof Lead, value: string) => {
//     const updatedLeads = leads.map((l) =>
//       l._id === lead._id ? { ...l, [field]: value } : l
//     );
//     setLeads(updatedLeads);
//   };

//   const handleAddLead = () => {
//     setLeads([
//       ...leads,
//       { name: '', mobileNumber: '', status: '', feedback: '', assignedSales: '' },
//     ]);
//   };

//   const handleBackToDashboard = () => {
//     if (role === 'General Manager') {
//       router.push('/dashboard/general-manager');
//     } else if (role === 'Sales Operations') {
//       router.push('/dashboard/sales-operations');
//     } else if (role === 'Sales') {
//       router.push('/dashboard/sales');
//     } else if (role === 'Head of Sales') {
//       router.push('/dashboard/head-of-sales');
//     } else if (role === 'Team Leader') {
//       router.push('/dashboard/team-leader');
//     }
//   };

//   const handleCloseSnackbar = () => {
//     setSnackbarOpen(false);
//   };

//   return (
//     <Box>
//       <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
//         <Typography variant="h4" component="h1">
//           Lead Funnel Info Page, {user?.username}
//         </Typography>
//         <Button variant="contained" onClick={handleBackToDashboard}>
//           Back to Dashboard
//         </Button>
//       </Box>
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               {accessRights.canRead.includes('name') && <TableCell>Lead Name</TableCell>}
//               {accessRights.canRead.includes('mobileNumber') && <TableCell>Lead Mobile Number</TableCell>}
//               {accessRights.canRead.includes('status') && <TableCell>Lead Status</TableCell>}
//               {accessRights.canRead.includes('feedback') && <TableCell>Feedback</TableCell>}
//               {accessRights.canRead.includes('assignedSales') && <TableCell>Assign Lead to Sales</TableCell>}
//               {accessRights.canWrite.length > 0 && <TableCell>Actions</TableCell>}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {filteredLeads.map((lead, index) => (
//               <TableRow key={index}>
//                 {accessRights.canRead.includes('name') && (
//                   <TableCell>
//                     {accessRights.canWrite.includes('name') ? (
//                       <TextField
//                         variant="outlined"
//                         value={lead.name}
//                         onChange={(e) => handleChange(lead, 'name', e.target.value)}
//                         fullWidth
//                         InputProps={{
//                           style: {
//                             backgroundColor: '#f5f5f5',
//                           },
//                         }}
//                       />
//                     ) : (
//                       lead.name
//                     )}
//                   </TableCell>
//                 )}
//                 {accessRights.canRead.includes('mobileNumber') && (
//                   <TableCell>
//                     {accessRights.canWrite.includes('mobileNumber') ? (
//                       <TextField
//                         variant="outlined"
//                         value={lead.mobileNumber}
//                         onChange={(e) => handleChange(lead, 'mobileNumber', e.target.value)}
//                         fullWidth
//                         InputProps={{
//                           style: {
//                             backgroundColor: '#f5f5f5',
//                           },
//                         }}
//                       />
//                     ) : (
//                       lead.mobileNumber
//                     )}
//                   </TableCell>
//                 )}
//                 {accessRights.canRead.includes('status') && (
//                   <TableCell>
//                     {accessRights.canWrite.includes('status') ? (
//                       <TextField
//                         variant="outlined"
//                         value={lead.status}
//                         onChange={(e) => handleChange(lead, 'status', e.target.value)}
//                         fullWidth
//                         InputProps={{
//                           style: {
//                             backgroundColor: '#f5f5f5',
//                           },
//                         }}
//                       />
//                     ) : (
//                       lead.status
//                     )}
//                   </TableCell>
//                 )}
//                 {accessRights.canRead.includes('feedback') && (
//                   <TableCell>
//                     {accessRights.canWrite.includes('feedback') ? (
//                       <TextField
//                         variant="outlined"
//                         value={lead.feedback}
//                         onChange={(e) => handleChange(lead, 'feedback', e.target.value)}
//                         fullWidth
//                         InputProps={{
//                           style: {
//                             backgroundColor: '#f5f5f5',
//                           },
//                         }}
//                       />
//                     ) : (
//                       lead.feedback
//                     )}
//                   </TableCell>
//                 )}
//                 {accessRights.canRead.includes('assignedSales') && (
//                   <TableCell>
//                     {accessRights.canWrite.includes('assignedSales') ? (
//                       <Select
//                         value={lead.assignedSales}
//                         onChange={(e) => handleChange(lead, 'assignedSales', e.target.value)}
//                         fullWidth
//                       >
//                         {salesPeople && salesPeople.map((salesPerson) => (
//                           <MenuItem key={salesPerson._id} value={salesPerson.username}>
//                             {salesPerson.username}
//                           </MenuItem>
//                         ))}
//                       </Select>

//                     ) : (
//                       lead.assignedSales
//                     )}
//                   </TableCell>
//                 )}
//                 {accessRights.canWrite.length > 0 && (
//                   <TableCell>
//                     <Button
//                       variant="contained"
//                       color="primary"
//                       onClick={() => handleSave(lead)}
//                     >
//                       Save
//                     </Button>
//                   </TableCell>
//                 )}
//               </TableRow>
//             ))}
//             {accessRights.canWrite.length === 5 && (
//               <TableRow>
//                 <TableCell colSpan={6} align="center">
//                   <Button variant="outlined" color="primary" onClick={handleAddLead}>
//                     Add New Lead
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={3000}
//         onClose={handleCloseSnackbar}
//       >
//         <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
//           {snackbarMessage}
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// };

// export default LeadFunnel;





//////////










import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Typography,
  MenuItem,
  Select,
  Button,
  Box,
  Snackbar,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { useRouter } from 'next/router';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

const roles = {
  'General Manager': {
    canRead: ['name', 'mobileNumber', 'status', 'feedback', 'assignedSales'],
    canWrite: ['name', 'mobileNumber', 'status', 'feedback', 'assignedSales'],
  },
  'Head of Sales': {
    canRead: ['name', 'mobileNumber', 'status', 'feedback', 'assignedSales'],
    canWrite: ['name', 'mobileNumber', 'status','feedback', 'assignedSales'],
  },
  'Sales Operations': {
    canRead: ['name', 'mobileNumber', 'status', 'feedback', 'assignedSales'],
    canWrite: ['name', 'mobileNumber', 'status','feedback', 'assignedSales'],
    // canWrite: ['feedback', 'assignedSales'],
  },
  'Team Leader': {
    canRead: ['name', 'mobileNumber', 'status', 'feedback', 'assignedSales'],
    canWrite: ['feedback'],
  },
  "Sales": {
    canRead: ['status', 'feedback', 'mobileNumber', 'name'],
    canWrite: ['feedback'],
  },
};

interface Lead {
  _id?: string;
  name: string;
  mobileNumber: string;
  status: string;
  feedback: string;
  assignedSales: string;
}

interface SalesPerson {
  _id: string;
  username: string;
  parentId: string | null;
}

const LeadFunnel = () => {
  const { user } = useAuth();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [salesPeople, setSalesPeople] = useState<SalesPerson[]>([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null); // For feedback modal
  const [feedbackText, setFeedbackText] = useState(''); // For feedback modal
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [leadsResponse, salesPeopleResponse] = await Promise.all([
          fetch('/api/get-leads'),
          fetch('/api/get-sales-people'),
        ]);
  
        const leadsData = await leadsResponse.json();
        const salesPeopleData = await salesPeopleResponse.json();
  
        setLeads(leadsData.leads);
        setSalesPeople(salesPeopleData.salesPeopleAndLeaders || []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);
  
  if (!user || !user._id) {
    console.log('User or User ID is missing:', user); // Debugging
    return <Typography>Loading...</Typography>;
  }
  
  const role = user.role as keyof typeof roles;
  const accessRights = roles[role] || { canRead: [], canWrite: [] };
  
  // Filter leads based on the user's role
  const filteredLeads = leads.filter((lead) => {
    if (role === 'Sales') {
      return lead.assignedSales === user.username;
    }
    if (role === 'Team Leader') {
      const managedSalesPeople = salesPeople?.filter(salesPerson => salesPerson.parentId === user._id);
      return lead.assignedSales === user.username || managedSalesPeople.some(salesPerson => salesPerson.username === lead.assignedSales);
    }
    return true;
  });

  const handleSave = async (lead: Lead) => {
    const response = await fetch('/api/save-lead', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(lead),
    });

    if (response.ok) {
      setSnackbarMessage('Lead saved successfully');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      const updatedLeads = await (await fetch('/api/get-leads')).json();
      setLeads(updatedLeads.leads);
    } else {
      setSnackbarMessage('Failed to save lead');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleChange = (lead: Lead, field: keyof Lead, value: string) => {
    const updatedLeads = leads.map((l) =>
      l._id === lead._id ? { ...l, [field]: value } : l
    );
    setLeads(updatedLeads);
  };

  const handleAddLead = () => {
    setLeads([
      ...leads,
      { name: '', mobileNumber: '', status: '', feedback: '', assignedSales: '' },
    ]);
  };

  const handleBackToDashboard = () => {
    if (role === 'General Manager') {
      router.push('/dashboard/general-manager');
    } else if (role === 'Sales Operations') {
      router.push('/dashboard/sales-operations');
    } else if (role === 'Sales') {
      router.push('/dashboard/sales');
    } else if (role === 'Head of Sales') {
      router.push('/dashboard/head-of-sales');
    } else if (role === 'Team Leader') {
      router.push('/dashboard/team-leader');
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const openFeedbackModal = (lead: Lead) => {
    setSelectedLead(lead);
    setFeedbackText(lead.feedback);
  };

  const closeFeedbackModal = () => {
    setSelectedLead(null);
    setFeedbackText('');
  };

  const saveFeedback = () => {
    if (selectedLead) {
      handleChange(selectedLead, 'feedback', feedbackText);
      handleSave(selectedLead);
    }
    closeFeedbackModal();
  };

  const exportToExcel = () => {
    const dataToExport = filteredLeads.map((lead) => {
      const exportData: any = {};
      accessRights.canRead.forEach((field) => {
        exportData[field] = lead[field as keyof Lead];
      });
      return exportData;
    });

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Leads');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, 'leads.xlsx');
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
        <Typography variant="h4" component="h1">
          Lead Funnel Info Page, {user?.username}
        </Typography>
        <Box>
          <Button variant="contained" onClick={handleBackToDashboard}>
            Back to Dashboard
          </Button>
          <Button variant="outlined" sx={{ marginLeft: 2 }} onClick={exportToExcel}>
            Export to Excel
          </Button>
        </Box>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {accessRights.canRead.includes('name') && <TableCell sx={{ fontWeight: 'bold', fontSize: '16px' }}>Lead Name</TableCell>}
              {accessRights.canRead.includes('mobileNumber') && <TableCell sx={{ fontWeight: 'bold', fontSize: '16px' }}>Lead Mobile Number</TableCell>}
              {accessRights.canRead.includes('status') && <TableCell sx={{ fontWeight: 'bold', fontSize: '16px' }}>Lead Status</TableCell>}
              {accessRights.canRead.includes('feedback') && <TableCell sx={{ fontWeight: 'bold', fontSize: '16px' }}>Feedback</TableCell>}
              {accessRights.canRead.includes('assignedSales') && <TableCell sx={{ fontWeight: 'bold', fontSize: '16px' }}>Assign Lead to Sales</TableCell>}
              {accessRights.canWrite.length > 0 && <TableCell sx={{ fontWeight: 'bold', fontSize: '16px' }}>Actions</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredLeads.map((lead, index) => (
              <TableRow key={index}>
                {accessRights.canRead.includes('name') && (
                  <TableCell>
                    {accessRights.canWrite.includes('name') ? (
                      <TextField
                        variant="outlined"
                        value={lead.name}
                        onChange={(e) => handleChange(lead, 'name', e.target.value)}
                        fullWidth
                        InputProps={{
                          style: {
                            backgroundColor: '#f5f5f5',
                          },
                        }}
                      />
                    ) : (
                      lead.name
                    )}
                  </TableCell>
                )}
                {accessRights.canRead.includes('mobileNumber') && (
                  <TableCell>
                    {accessRights.canWrite.includes('mobileNumber') ? (
                      <TextField
                        variant="outlined"
                        value={lead.mobileNumber}
                        onChange={(e) => handleChange(lead, 'mobileNumber', e.target.value)}
                        fullWidth
                        InputProps={{
                          style: {
                            backgroundColor: '#f5f5f5',
                          },
                        }}
                      />
                    ) : (
                      lead.mobileNumber
                    )}
                  </TableCell>
                )}
                {accessRights.canRead.includes('status') && (
                  <TableCell>
                    {accessRights.canWrite.includes('status') ? (
                      <TextField
                        variant="outlined"
                        value={lead.status}
                        onChange={(e) => handleChange(lead, 'status', e.target.value)}
                        fullWidth
                        InputProps={{
                          style: {
                            backgroundColor: '#f5f5f5',
                          },
                        }}
                      />
                    ) : (
                      lead.status
                    )}
                  </TableCell>
                )}
                {accessRights.canRead.includes('feedback') && (
                  <TableCell>
                    {accessRights.canWrite.includes('feedback') ? (
                      <Button onClick={() => openFeedbackModal(lead)}>
                        {lead.feedback.length > 0 ? 'Edit Feedback' : 'Add Feedback'}
                      </Button>
                    ) : (
                      lead.feedback
                    )}
                  </TableCell>
                )}
                {accessRights.canRead.includes('assignedSales') && (
                  <TableCell>
                    {accessRights.canWrite.includes('assignedSales') ? (
                      <Select
                        value={lead.assignedSales}
                        onChange={(e) => handleChange(lead, 'assignedSales', e.target.value)}
                        fullWidth
                      >
                        {salesPeople && salesPeople.map((salesPerson) => (
                          <MenuItem key={salesPerson._id} value={salesPerson.username}>
                            {salesPerson.username}
                          </MenuItem>
                        ))}
                      </Select>
                    ) : (
                      lead.assignedSales
                    )}
                  </TableCell>
                )}
                {accessRights.canWrite.length > 0 && (
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleSave(lead)}
                    >
                      Save
                    </Button>
                  </TableCell>
                )}
              </TableRow>
            ))}
            {accessRights.canWrite.length === 5 && (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <Button variant="outlined" color="primary" onClick={handleAddLead}>
                    Add New Lead
                  </Button>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>

      <Dialog open={Boolean(selectedLead)} onClose={closeFeedbackModal}>
        <DialogTitle>Edit Feedback</DialogTitle>
        <DialogContent>
          <TextField
            label="Feedback"
            multiline
            rows={4}
            fullWidth
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeFeedbackModal}>Cancel</Button>
          <Button onClick={saveFeedback} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default LeadFunnel;
