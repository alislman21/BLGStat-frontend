import { useState, useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import WelcomePage from './app/pages/WelcomePage';
import Signup from './app/pages/Signup';
import Login from './app/pages/Login';
import Home from './app/pages/Home';
import Profile from './app/pages/Profile';
import Logout from './app/pages/Logout';
import Report from './app/pages/Report';
import ProtectedRoute from "./app/pages/ProtectedRoute";
import Settings from './app/pages/Settings';

const router = createBrowserRouter([
  {
    path: '/',
    element: <WelcomePage />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/home',
    element: (
        <ProtectedRoute isAuthenticated={localStorage.getItem('isAuthenticated') === 'true'}>
          <Home />
        </ProtectedRoute>
    ),
  },
  {
    path: '/profile',
    element: (
        <ProtectedRoute isAuthenticated={localStorage.getItem('isAuthenticated') === 'true'}>
          <Profile />
        </ProtectedRoute>
    ),
  },
  {
    path: '/logout',
    element: <Logout />,
  },
  {
    path: '/report',
    element: <Report />
  },
  {
    path: '/settings',
    element: <Settings />
  }
 
]);

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  return (
      <RouterProvider router={router} />
  );
}

export default App;
