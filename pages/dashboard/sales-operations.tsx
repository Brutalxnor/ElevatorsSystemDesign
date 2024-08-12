// // pages/dashboard/sales-operation.tsx

// "use client";

// import React, { useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { useAuth } from '../../contexts/AuthContext';

// const SalesOperationDashboard = () => {
//   const { user } = useAuth();
//   const router = useRouter();

//   if (user?.role !== 'Sales Operations') {
//     return null; // Optionally, render nothing until the redirect happens
//   }
//   useEffect(() => {
//     if (user?.role !== 'Sales Operations') {
//       router.push('/unauthorized'); // Redirect to an unauthorized page
//     }
//   }, [user, router]);


//   return (
//     <div>
//       <h1>Welcome to Sales Operation Dashboard, {user?.username}</h1>
//       <p>Here you can manage the sales operation but do not have access to the calculator.</p>
//     </div>
//   );
// };

// export default SalesOperationDashboard;










"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../contexts/AuthContext';
import { Box, Button, Typography } from '@mui/material';

const SalesOperationDashboard = () => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user?.role !== 'Sales Operations') {
      router.push('/unauthorized'); // Redirect to an unauthorized page
    }
  }, [user, router]);

  if (user?.role !== 'Sales Operations') {
    return null; // Optionally, render nothing until the redirect happens
  }

  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome to Sales Operation Dashboard, {user?.username}
      </Typography>
      <Box sx={{ display: 'flex', gap: '10px', mt: '20px' }}>
        {/* <Button
          variant="contained"
          color="primary"
          onClick={() => router.push('/calculator')}
        >
          Go to Calculator
        </Button> */}
        <Button
          variant="contained"
          color="secondary"
          onClick={() => router.push('/lead-funnel')}
        >
          Go to Lead Funnel Info
        </Button>
      </Box>
    </Box>
  );
};

export default SalesOperationDashboard;
