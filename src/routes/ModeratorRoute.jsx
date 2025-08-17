import React from 'react';
import { Navigate, useLocation } from 'react-router';
import { useAuth } from '../context/AuthContext';

const ModeratorRoute = ({ children }) => {
    const { user, loading, isModerator } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <span className="loading loading-spinner loading-lg text-accent"></span>
            </div>
        );
    }

    if (!user || !isModerator) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

export default ModeratorRoute;
