import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import Root from './layouts/Root.jsx';
import Home from './components/Home/Home.jsx';
import Login from './components/Login/Login.jsx';
import Register from './components/Register/Register.jsx';
import AuthProvider from './contexts/AuthProvider.jsx';
import PrivateRoute from './routes/PrivateRoute.jsx';
import Profile from './components/Profile/Profile.jsx';
import Error from './components/Error/Error.jsx';
import ForgotPassword from './components/Forgotpassword/Forgotpassword.jsx';
import About from './components/About/About.jsx';
import Createpost from './components/createroom.jsx'
import Mylist from './components/mylist.jsx'
import UpdateRoommatePost from './components/updateroom.jsx';
import DetailsPage from './components/detailspage.jsx';
import Loader from './components/loader.jsx';
import AboutSection from './components/about.jsx';
import Allitems from './components/allitems.jsx';
import Dashboard from './components/dashboard.jsx';
import Support from './components/Support/Support.jsx';
import Contact from './components/Contact.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: 'login',
        Component: Login
      },
      {
        path: 'about',
        Component: About
      },
      {
        path: 'support',
        Component: Support
      },
      {
        path: 'contact',
        Component: Contact
      },
      {
        path: 'support',
        Component: Support
      },
      {
        path: 'dashboard',
        Component: Dashboard
      },
      {
        path: 'aboutsection',
        Component: AboutSection
      },
      {
        path: 'all-items',
        Component: Allitems
      },
      {
        path: 'register',
        Component: Register
      },
      {
        path: 'forgot-password',
        Component: ForgotPassword,
      },
      {
        path: 'profile',
        element: <PrivateRoute><Profile></Profile></PrivateRoute>
      },
      {
        path: 'createroom',
        element: <PrivateRoute><Createpost></Createpost></PrivateRoute>
      },
      {
        path: 'browselist',
        element: <PrivateRoute><Allitems></Allitems></PrivateRoute>
      },
      {
        path: 'mylist',
        element: <PrivateRoute><Mylist></Mylist></PrivateRoute>
      },
      {
        path: '/update/:id',
        element: <UpdateRoommatePost />
      },
      {
        path: 'details/:id',
        element: <PrivateRoute><DetailsPage /></PrivateRoute>
      },
      {
        path: '*',
        Component: Error,
      },
    ]
  },
]);

function AppWithLoader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />;
  return <RouterProvider router={router} />;
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <AppWithLoader />
    </AuthProvider>
  </StrictMode>,
)