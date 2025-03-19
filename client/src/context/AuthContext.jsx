import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [auth, setAuth] = useState(null);

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
        if (userData && userData.salonID) {
            localStorage.setItem('salon', JSON.stringify(userData));
            setAuth({ ...userData, role: 'salon' });
        } else if (userData) {
            localStorage.setItem('user', JSON.stringify(userData));
            setAuth({ ...userData, role: 'user' });
        } else {
            console.error("Invalid userData provided!");
            return;
        }
    };
    
    const logout = () => {
        setAuth(null);
        localStorage.removeItem('user');
        localStorage.removeItem('salon');
    };

    return (
        <AuthContext.Provider value={{ auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
