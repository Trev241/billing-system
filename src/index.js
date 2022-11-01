import React from 'react'
import ReactDOM from 'react-dom/client'
import {
    createBrowserRouter,
    RouterProvider,
    // Route,
  } from "react-router-dom";

// import './index.css'

import Home from './components/Home'
import ErrorPage from './components/ErrorPage'
import Login from './components/Login'
import Signup from './components/Signup';
import Workspace from './components/Workspace';
import History from './components/history';
import { AuthProvider } from './AuthProvider';
import Inventory from './components/Inventory';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        errorElement: <ErrorPage />,
        // children: [
        //     {
        //         path: "/create-invoice",
        //         element: <Invoice />,
        //     }
        // ]
    },
    {
        path: "/create-invoice",
        element: <Workspace />,
        errorElement: <ErrorPage />
    },
    {
        path: "/signin",
        element: <Login />,
        errorElement: <ErrorPage />
    },
    {
        path: "/signup",
        element: <Signup />,
        errorElement: <ErrorPage />
    },
    {
        path: "/inventory",
        element: <Inventory />,
        errorElement: <ErrorPage />
    },
    {
        path: "/history",
        element: <History />,
        errorElement: <ErrorPage />
    }
])

// ========================================
  
ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    </React.StrictMode>
)
