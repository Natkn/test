'use client';

import { createContext, useContext } from 'react';

interface AuthContextProps {
  onComplete: (code: string) => void;
}

const AuthContext = createContext<AuthContextProps>({
  onComplete: (code: string) => console.log('Код подтверждения:', code), // Функция по умолчанию
});

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children, onComplete }: {
  children: React.ReactNode;
  onComplete: (code: string) => void;
}) => {
  return (
    <AuthContext.Provider value={{ onComplete }}>
      {children}
    </AuthContext.Provider>
  );
};