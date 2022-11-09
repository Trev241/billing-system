import React from 'react'
import ReactDOM from 'react-dom/client'
import {
    Routes,
    BrowserRouter as Router,
    Route,
} from "react-router-dom";

  
import Home from './components/Home'
import ErrorPage from './components/ErrorPage'
import Login from './components/Login'
import Signup from './components/Signup';
import Workspace from './components/Workspace';
import History from './components/history';
import { AuthProvider } from './AuthProvider';
import Inventory from './components/Inventory';
import './index.css'
import PrivateRoutes from './utils/PrivateRoutes';

// ========================================
  
ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <AuthProvider>
            {/* <RouterProvider router={router} /> */}
            <Router>
                <Routes>
                    <Route element={<Home />} path="/" />
                    <Route element={<Login />} path="signin" />
                    <Route element={<Signup />} path="signup" />
                    <Route element={<PrivateRoutes />}>
                        <Route element={<Workspace />} path="create-invoice" />
                        <Route element={<Inventory />} path="inventory" />
                        <Route element={<History />} path="history" />
                    </Route>
            
                    <Route element={<ErrorPage />} path="*" />
                </Routes>
            </Router>
        </AuthProvider>
    </React.StrictMode>
)
