import React from 'react'
import ReactDOM from 'react-dom/client'
import {
    createBrowserRouter,
    RouterProvider,
    // Route,
  } from "react-router-dom";

// import './index.css'

import Home from './components/Home';
import Invoice from './components/Invoice'
import ErrorPage from './components/ErrorPage';

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
        element: <Invoice />,
        errorElement: <ErrorPage />
    }
])

// ========================================
  
ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
)
