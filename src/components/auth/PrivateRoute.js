import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { authAPI } from '../../data/database';

const PrivateRoute = ({ children, requireAdmin = false }) => {
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const user = await authAPI.getCurrentUser();
                if (user) {
                    setAuthenticated(true);
                    const adminStatus = await authAPI.isAdmin();
                    setIsAdmin(adminStatus);
                }
            } catch (error) {
                console.error('Ошибка при проверке аутентификации:', error);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-xl">Загрузка...</div>
            </div>
        );
    }

    if (!authenticated) {
        return <Navigate to="/auth" state={{ from: location }} replace />;
    }

    // Если пользователь админ и пытается зайти на обычную страницу
    if (isAdmin && !requireAdmin && location.pathname !== '/admin-page') {
        return <Navigate to="/admin-page" replace />;
    }

    // Если пользователь не админ и пытается зайти на админ страницу
    if (!isAdmin && requireAdmin) {
        return <Navigate to="/profile" replace />;
    }

    return children;
};

export default PrivateRoute; 