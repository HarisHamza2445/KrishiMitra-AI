import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

import CropRecommendation from './pages/CropRecommendation';

// Placeholder Pages (Will be implemented one by one)
import Weather from './pages/Weather';

// Placeholder Pages (Will be implemented one by one)
import DiseaseDetection from './pages/DiseaseDetection';
import MarketPrice from './pages/MarketPrice';

function App() {
    return (
        <AuthProvider>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Protected Routes */}
                <Route path="/dashboard" element={
                    <PrivateRoute>
                        <Dashboard />
                    </PrivateRoute>
                } />

                <Route path="/crop-ai" element={
                    <PrivateRoute>
                        <CropRecommendation />
                    </PrivateRoute>
                } />

                <Route path="/weather" element={
                    <PrivateRoute>
                        <Weather />
                    </PrivateRoute>
                } />

                <Route path="/disease" element={
                    <PrivateRoute>
                        <DiseaseDetection />
                    </PrivateRoute>
                } />

                <Route path="/market" element={
                    <PrivateRoute>
                        <MarketPrice />
                    </PrivateRoute>
                } />

                {/* Default Redirect */}
                <Route path="/" element={<Navigate to="/dashboard" />} />
            </Routes>
        </AuthProvider>
    );
}

export default App;
