// import React from 'react';
// import { Box, Typography, Button, Container } from '@mui/material';
// import { useRouter } from 'next/router';

// const LandingPage = () => {
//   const router = useRouter();

//   const handleLogin = () => {
//     router.push('/login');
//   };

//   const handleSignUp = () => {
//     router.push('/signup');
//   };

//   return (
//     <Box
//       sx={{
//         height: '100vh',
//         backgroundColor: '#000',
//         color: '#fff',
//         display: 'flex',
//         flexDirection: 'column',
//         justifyContent: 'center',
//         alignItems: 'center',
//         textAlign: 'center',
//         backgroundImage: 'url(/background-animation.gif)', // Replace with your animation or background
//         backgroundSize: 'cover',
//       }}
//     >
//       <Container maxWidth="sm">
//         <Typography variant="h1" component="h1" sx={{ fontSize: '4rem', mb: 4 }}>
//           Misr Elevators
//         </Typography>
//         <Box display="flex" gap={2}>
//           <Button variant="contained" color="primary" onClick={handleLogin}>
//             Log In
//           </Button>
//           <Button variant="contained" color="secondary" onClick={handleSignUp}>
//             Sign Up
//           </Button>
//         </Box>
//       </Container>
//     </Box>
//   );
// };

// export default LandingPage;






// app/index.tsx

import { useRouter } from 'next/router';
import { Button, Container, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';

export default function Home() {
  const router = useRouter();

  const handleLogin = () => {
    router.push('/login');
  };

  const handleSignup = () => {
    router.push('/signup');
  };

  return (
    <Container maxWidth="md" sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Box
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        sx={{ textAlign: 'center', color: '#ffffff' }}
      >
        <Typography variant="h1" component="h1" gutterBottom>
          Misr Elevators
        </Typography>
        <Typography variant="h5" component="p" gutterBottom>
          Welcome to the Future of Elevators
        </Typography>
        <Box sx={{ mt: 4 }}>
          <Button variant="contained" color="primary" onClick={handleLogin} sx={{ mr: 2 }}>
            Log in
          </Button>
          <Button variant="outlined" color="primary" onClick={handleSignup}>
            Sign up
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
