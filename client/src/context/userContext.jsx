import React, { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    const login = (userData) => {    
        if (userData && userData.salonID) {
            localStorage.setItem('salon', JSON.stringify(userData));
        } else if (userData) {
            localStorage.setItem('user', JSON.stringify(userData));
        } else {
            console.error("Invalid userData provided!");
            return;
        }
    
        setUser(userData);
    };
    

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('salon');
    };

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => useContext(UserContext);
