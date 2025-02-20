import React, { createContext, useState, useContext } from 'react';

const LoadingContext = createContext();

export const useLoading = () => useContext(LoadingContext);

export const LoadingProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);

    const setGlobalLoading = (isLoading) => {
        setLoading(isLoading);
    };

    return (
        <LoadingContext.Provider value={{ loading, setGlobalLoading }}>
            {children}
        </LoadingContext.Provider>
    );
};
