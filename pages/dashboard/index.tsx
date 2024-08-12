// pages/dashboard/index.tsx

"use client";

import React from 'react';
import { Typography, Box, Button } from '@mui/material';
import { useRouter } from 'next/navigation';

const Dashboard = () => {
  const router = useRouter();

  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome to Misr Elevators Dashboard
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

export default Dashboard;
