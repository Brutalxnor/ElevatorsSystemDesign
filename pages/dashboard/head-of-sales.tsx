// "use client";

// import React, { useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { useAuth } from '../../contexts/AuthContext';

// const HeadOfSalesDashboard = () => {
//   const { user } = useAuth();
//   const router = useRouter();

//   if (user?.role !== 'Head of Sales') {
//     return null; // Optionally, render nothing until the redirect happens
//   }
//   useEffect(() => {
//     if (user?.role !== 'Head of Sales') {
//       router.push('/unauthorized'); // Redirect to an unauthorized page
//     }
//   }, [user, router]);


//   return (
//     <div>
//       <h1>Welcome to Head of Sales Dashboard, {user?.username}</h1>
//       <p>Here you can oversee sales operations.</p>
//     </div>
//   );
// };

// export default HeadOfSalesDashboard;





"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../contexts/AuthContext';
import { Box, Button, Typography } from '@mui/material';

const HeadOfSalesDashboard = () => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user?.role !== 'Head of Sales') {
      router.push('/unauthorized'); // Redirect to an unauthorized page
    }
  }, [user, router]);

  if (user?.role !== 'Head of Sales') {
    return null; // Optionally, render nothing until the redirect happens
  }

  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome to Head of Sales Dashboard, {user?.username}
      </Typography>
      <Box sx={{ display: 'flex', gap: '10px', mt: '20px' }}>
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

export default HeadOfSalesDashboard;
