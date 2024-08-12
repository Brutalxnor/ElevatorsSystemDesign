// "use client";

// import React, { useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { useAuth } from '../../contexts/AuthContext';

// const SalesDashboard = () => {
//   const { user } = useAuth();
//   const router = useRouter();

//   if (user?.role !== 'Sales') {
//     return null; // Optionally, render nothing until the redirect happens
//   }
//   useEffect(() => {
//     if (user?.role !== 'Sales') {
//       router.push('/unauthorized'); // Redirect to an unauthorized page
//     }
//   }, [user, router]);


//   return (
//     <div>
//       <h1>Welcome to Sales Dashboard, {user?.username}</h1>
//       <p>Here you can see your assigned tasks and reports.</p>
//     </div>
//   );
// };

// export default SalesDashboard;








"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../contexts/AuthContext';
import { Box, Button, Typography } from '@mui/material';

const SalesDashboard = () => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user?.role !== 'Sales') {
      router.push('/unauthorized'); // Redirect to an unauthorized page
    }
  }, [user, router]);

  if (user?.role !== 'Sales') {
    return null; // Optionally, render nothing until the redirect happens
  }

  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome to Sales Dashboard, {user?.username}
      </Typography>
      <Box sx={{ display: 'flex', gap: '10px', mt: '20px' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => router.push('/calculator')}
        >
          Go to Calculator
        </Button>
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

export default SalesDashboard;
