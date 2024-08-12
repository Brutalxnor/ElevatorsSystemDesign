"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { Box, Button, Typography } from '@mui/material';
import { useAuth } from '../contexts/AuthContext'; // Import the useAuth hook

const Unauthorized = () => {
  const router = useRouter();
  const { user } = useAuth(); // Get the user from the context

  const handleRedirect = () => {
    if (!user || !user.role) {
      // If user or user role is undefined, redirect to a generic dashboard
      return;
    }

    // Redirect based on user role
    switch (user.role) {
      case 'General Manager':
        router.push('/dashboard/general-manager');
        break;
      case 'Head of Sales':
        router.push('/dashboard/head-of-sales');
        break;
      case 'Sales Operation':
        router.push('/dashboard/sales-operation');
        break;
      case 'Sales Team Leader':
        router.push('/dashboard/team-leader');
        break;
      case 'Sales':
        router.push('/dashboard/sales');
        break;
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#1A202C', // Dark background for better contrast
        padding: '0 16px',
        color: '#E2E8F0', // Light text color for readability
      }}
    >
      <Typography
        variant="h4"
        sx={{ 
          mb: 4,
          fontWeight: 'bold', 
          color: '#F56565', // Red color for emphasis on unauthorized access
        }}
      >
        Unauthorized Access
      </Typography>
      <Typography
        variant="body1"
        sx={{ 
          mb: 6,
          textAlign: 'center', 
          maxWidth: '400px', 
          color: '#CBD5E0', // Slightly lighter color for the supporting text
        }}
      >
        You do not have the necessary permissions to access this page. Please return to your designated dashboard.
      </Typography>
      <Button
        variant="contained"
        color="secondary"
        sx={{
          backgroundColor: '#48BB78', // Green color for the button to indicate action
          color: '#1A202C', // Dark text on light background
          fontWeight: 'bold',
          padding: '10px 20px',
          borderRadius: '8px',
          '&:hover': {
            backgroundColor: '#38A169', // Darker green on hover
          },
        }}
        onClick={handleRedirect}
      >
        Go to Your Dashboard
      </Button>
    </Box>
  );
};

export default Unauthorized;
