// "use client";

// import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
// import { useRouter } from 'next/navigation';

// // interface User {
// //   username: string;
// //   role: string; // User role
// //   managerId?: string; // Optional: Reference to the user's manager
// //   id?: string; // Optional: User's ID
// // }


// interface User {
//   _id: string;
//   username: string;
//   role: string; // User role
//   managerId?: string; // Optional: Reference to the user's manager

// }


// interface AuthContextProps {
//   user: User | null;
//   signIn: (username: string, password: string) => Promise<void>;
//   signUp: (username: string, password: string) => Promise<void>;
//   signOut: () => void;
// }

// const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const router = useRouter();

//   useEffect(() => {
//     const storedUser = localStorage.getItem('user');
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//   }, []);

//   const signIn = async (username: string, password: string) => {
//     const response = await fetch('/api/login', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ username, password }),
//     });

//     if (response.ok) {
//       const data = await response.json();
//       console.log(data.user.role);
//       setUser(data.user);
//       localStorage.setItem('user', JSON.stringify(data.user));
//       navigateDashboard(data.user.role);
//     } else {
//       throw new Error('Login failed');
//     }
//   };

//   const signUp = async (username: string, password: string) => {
//     const response = await fetch('/api/signup', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ username, password }),
//     });

//     if (response.ok) {
//       const data = await response.json();
//       setUser(data.user);
//       localStorage.setItem('user', JSON.stringify(data.user));
//       navigateDashboard(data.user.role);
//     } else {
//       throw new Error('Signup failed');
//     }
//   };

//   const signOut = () => {
//     setUser(null);
//     localStorage.removeItem('user');
//     router.push('/');
//   };

//   const navigateDashboard = (role: string) => {
//     if (role === 'General Manager') {
//       router.push('/dashboard/general-manager');
//     } else if (role === 'Head of Sales') {
//       router.push('/dashboard/head-of-sales');
//     } else if (role === 'Sales Operations') {
//       router.push('/dashboard/sales-operations');
//     } else if (role === 'Team Leader') {
//       router.push('/dashboard/team-leader');
//     } else if (role === 'Sales') {
//       router.push('/dashboard/sales');
//     } 
//   };
  
//   return (
//     <AuthContext.Provider value={{ user, signIn, signUp, signOut }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };












"use client";

import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  _id: string;
  username: string;
  role: string;
  managerId?: string; // Optional: Reference to the user's manager
}

interface AuthContextProps {
  user: User | null;
  signIn: (username: string, password: string) => Promise<void>;
  signUp: (username: string, password: string) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser) as User;
      setUser(parsedUser);
    }
  }, []);

  const signIn = async (username: string, password: string) => {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const data = await response.json();
      if (data.user && data.user._id) { // Ensure _id is present
        setUser(data.user);
        localStorage.setItem('user', JSON.stringify(data.user));
        navigateDashboard(data.user.role);
      } else {
        throw new Error('Invalid user data returned');
      }
    } else {
      throw new Error('Login failed');
    }
  };

  const signUp = async (username: string, password: string) => {
    const response = await fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const data = await response.json();
      if (data.user && data.user._id) { // Ensure _id is present
        setUser(data.user);
        localStorage.setItem('user', JSON.stringify(data.user));
        navigateDashboard(data.user.role);
      } else {
        throw new Error('Invalid user data returned');
      }
    } else {
      throw new Error('Signup failed');
    }
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('user');
    router.push('/');
  };

  const navigateDashboard = (role: string) => {
    if (role === 'General Manager') {
      router.push('/dashboard/general-manager');
    } else if (role === 'Head of Sales') {
      router.push('/dashboard/head-of-sales');
    } else if (role === 'Sales Operations') {
      router.push('/dashboard/sales-operations');
    } else if (role === 'Team Leader') {
      router.push('/dashboard/team-leader');
    } else if (role === 'Sales') {
      router.push('/dashboard/sales');
    }
  };
  
  return (
    <AuthContext.Provider value={{ user, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
