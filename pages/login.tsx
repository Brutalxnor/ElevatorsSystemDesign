// "use client";

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { Box, Button, TextField, Typography } from '@mui/material';

// const LoginPage = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const router = useRouter();

//   const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();

//     const response = await fetch('/api/login', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ username, password }), // Use username instead of email
//     });

//     if (response.ok) {
//       router.push('/dashboard');
//     } else {
//       alert('Invalid credentials');
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
//         backgroundColor: '#f0f0f0',
//         padding: '0 16px',
//       }}
//     >
//       <Box
//         sx={{
//           width: '100%',
//           maxWidth: '400px',
//           backgroundColor: '#ffffff',
//           padding: '24px',
//           borderRadius: '8px',
//           boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
//         }}
//       >
//         <Typography component="h1" variant="h5" sx={{ textAlign: 'center', marginBottom: '24px' }} className='text-slate-700'>
//           Log In
//         </Typography>
//         <Box component="form" onSubmit={handleSubmit}>
//           <TextField
//             margin="normal"
//             required
//             fullWidth
//             id="username"
//             label="Username"
//             name="username"
//             autoComplete="username"
//             autoFocus
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           />
//           <TextField
//             margin="normal"
//             required
//             fullWidth
//             name="password"
//             label="Password"
//             type="password"
//             id="password"
//             autoComplete="current-password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <Button
//             type="submit"
//             fullWidth
//             variant="contained"
//             sx={{ marginTop: '24px', marginBottom: '16px' }}
//           >
//             Log In
//           </Button>
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default LoginPage;







"use client";

import { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useAuth } from '../contexts/AuthContext'; // Import the useAuth hook

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useAuth(); // Get the signIn function from the context

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await signIn(username, password);
    } catch (error) {
      alert('Invalid credentials');
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
        backgroundColor: '#f0f0f0',
        padding: '0 16px',
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: '400px',
          backgroundColor: '#ffffff',
          padding: '24px',
          borderRadius: '8px',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography component="h1" variant="h5" sx={{ textAlign: 'center', marginBottom: '24px' }} className='text-slate-700'>
          Log In
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ marginTop: '24px', marginBottom: '16px' }}
          >
            Log In
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;
