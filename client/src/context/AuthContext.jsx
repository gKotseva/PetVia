import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNotification } from './NotificationContext';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [auth, setAuth] = useState(null);
    const {showNotification} = useNotification()
    const navigate = useNavigate()

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const storedSalon = localStorage.getItem('salon');
    
        if (storedSalon) {
            setAuth({ ...JSON.parse(storedSalon), role: 'salon' });
        } else if (storedUser) {
            setAuth({ ...JSON.parse(storedUser), role: 'user' });
        }
    }, []);
    
    const login = (userData) => {    
        if (userData && userData.salonId) {
            localStorage.setItem('salon', JSON.stringify({salon_name: userData.salon_name, id: userData.salonId}));
            setAuth({...userData, id: userData.salonId, role: 'salon' });
        } else if (userData) {
            localStorage.setItem('user', JSON.stringify(userData));
            setAuth({ ...userData, role: 'user' });
        } else {
            return;
        }
    };
    
    const logout = () => {
        setAuth(null);
        localStorage.removeItem('user');
        localStorage.removeItem('salon');
        showNotification('Logout successfull!', 'success')
        navigate('/')
    };

    return (
        <AuthContext.Provider value={{ auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
