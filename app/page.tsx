"use client";

import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { useRouter } from 'next/navigation';

const LandingPage: React.FC = () => {
  const router = useRouter();

  const handleLogin = () => {
    router.push('/login');
  };

  const handleSignup = () => {
    router.push('/signup');
  };

  return (
    <Box
      sx={{
        height: '100vh',
        backgroundColor: '#000',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(to bottom right, rgba(0,0,0,0.5), rgba(0,0,0,0.9))',
          zIndex: 2,
        }}
      />

      <Container
        maxWidth="sm"
        sx={{
          position: 'relative',
          zIndex: 3,
          animation: 'fadeIn 3s ease-in-out',
        }}
      >
        <Typography
          variant="h1"
          component="h1"
          sx={{
            fontSize: '4rem',
            mb: 4,
            fontWeight: 'bold',
            textShadow: '2px 2px 5px rgba(0,0,0,0.5)',
          }}
        >
          Misr Elevators
        </Typography>
        <Typography
          variant="h5"
          component="p"
          sx={{
            mb: 4,
            textShadow: '2px 2px 5px rgba(0,0,0,0.5)',
          }}
        >
          Elevating the Future
        </Typography>
        <Box display="flex" gap={2} justifyContent="center" sx={{ mb: 4 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleLogin}
            sx={{
              fontSize: '1.2rem',
              padding: '10px 20px',
              textTransform: 'uppercase',
              borderRadius: '25px',
            }}
          >
            Log In
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleSignup}
            sx={{
              fontSize: '1.2rem',
              padding: '10px 20px',
              textTransform: 'uppercase',
              borderRadius: '25px',
              color: '#fff',
              borderColor: '#fff',
              '&:hover': {
                borderColor: '#aaa',
              },
            }}
          >
            Sign Up
          </Button>
        </Box>
      </Container>

      {/* Minimal Creative Elements */}
      <Box
        sx={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          width: '50px',
          height: '50px',
          backgroundColor: '#00BFFF',
          borderRadius: '50%',
          zIndex: 3,
          animation: 'float 4s ease-in-out infinite',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '20%',
          right: '15%',
          width: '30px',
          height: '30px',
          backgroundColor: '#FFD700',
          borderRadius: '50%',
          zIndex: 3,
          animation: 'float 6s ease-in-out infinite',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          width: '100px',
          height: '100px',
          border: '2px solid #ffffff',
          borderRadius: '50%',
          zIndex: 3,
          transform: 'translate(-50%, -50%)',
          animation: 'pulse 3s ease-in-out infinite',
        }}
      />

      <Box
        sx={{
          position: 'absolute',
          top: '70%',
          left: '20%',
          width: '50px',
          height: '50px',
          border: '2px solid #083b8e',
          borderRadius: '50%',
          zIndex: 3,
          transform: 'translate(-50%, -50%)',
          animation: 'pulse 3s ease-in-out infinite',
        }}
      />

      <Box
        sx={{
          position: 'absolute',
          top: '70%',
          left: '70%',
          width: '60px',
          height: '60px',
          border: '2px solid #aa0c0c',
          borderRadius: '50%',
          zIndex: 3,
          transform: 'translate(-50%, -50%)',
          animation: 'pulse 3s ease-in-out infinite',
        }}
      />

      {/* Rotating  */}

      <Box
        sx={{
          position: 'absolute',
          bottom: '10%',
          left: '40%',
          width: '25px',
          height: '25px',
          backgroundColor: 'transparent',
          border: '2px solid #FFFFFF',
          zIndex: 2,
          animation: 'rotate 8s linear infinite',
        }}
      />

      {/* Blob Animations */}

      {/* Blob Animations */}

      <Box
        sx={{
          position: 'absolute',
          bottom: '30%',
          right: '20%',
          width: '15px',
          height: '15px',
          backgroundColor: '#FFD700',
          borderRadius: '50%',
          zIndex: 3,
          animation: 'flash 2s infinite',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: '30%',
          left: '30%',
          width: '10px',
          height: '10px',
          backgroundColor: '#ADFF2F',
          borderRadius: '50%',
          zIndex: 3,
          animation: 'flash 2.5s infinite',
        }}
      />



      {/* Blob Animations */}
      <Box
        sx={{
          position: 'absolute',
          bottom: '-50px',
          left: '-50px',
          width: '300px',
          height: '300px',
          backgroundColor: '#0099FF',
          borderRadius: '50%',
          zIndex: 0,
          animation: 'blob 20s infinite linear',
          opacity: 0.6,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: '-100px',
          right: '-100px',
          width: '400px',
          height: '400px',
          backgroundColor: '#FF3366',
          borderRadius: '50%',
          zIndex: 0,
          animation: 'blob 25s infinite linear',
          opacity: 0.4,
        }}
      />
    </Box>
  );
};

export default LandingPage;
