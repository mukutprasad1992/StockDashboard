import React, { createContext, useContext, useState } from 'react';

interface TokenContextType {
    token: string | null;
    setBearerToken: (newToken: string) => void;
}

const TokenContext = createContext<TokenContextType | undefined>(undefined);

export const TokenProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string | null>(null);

    const setBearerToken = (newToken: string) => {
        setToken(`Bearer ${newToken}`);
    };

    return (
        <TokenContext.Provider value={{ token, setBearerToken }}>
            {children}
        </TokenContext.Provider>
    );
};

export const useToken = (): TokenContextType => {
    const context = useContext(TokenContext);
    if (!context) {
        throw new Error('useToken must be used within a TokenProvider');
    }
    return context;
};
