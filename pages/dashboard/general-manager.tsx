// pages/dashboard/general-manager.tsx

"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../contexts/AuthContext';
import { Box, Button, Typography } from '@mui/material';

const GeneralManagerDashboard = () => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user?.role !== 'General Manager') {
      router.push('/unauthorized'); // Redirect to an unauthorized page
    }
  }, [user, router]);
  
  if (user?.role !== 'General Manager') {
    return null; // Optionally, render nothing until the redirect happens
  }

  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome to General Manager Dashboard, {user?.username}
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
        <Button
          variant="contained"
          color="success"
          onClick={() => router.push('/dashboard/user-management')}
        >
          Manage Users
        </Button>
      </Box>
    </Box>
  );
};

export default GeneralManagerDashboard;
