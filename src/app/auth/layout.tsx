
'use client'
import { ReactNode, useEffect, useState } from 'react';
import styles from './layout.module.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '../auth/authContext';

interface AuthLayoutProps {
  children: ReactNode;
}


export default function AuthLayout({ children }: AuthLayoutProps) {
  const queryClient = new QueryClient();
  const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
    setIsLoading(false);
  }, []);

 const onComplete = (code: string) => {
    console.log(`Код подтверждения: ${code}`);
    // Здесь можно добавить логику обработки кода
  };

  return (
     <QueryClientProvider client={queryClient}>
       <AuthProvider onComplete={onComplete}>
       {isLoading && (
        <div className={styles.spinnerOverlay}>
          <div className={styles.loader}></div>
        </div>
      )}
      
    <div className={styles.wrapper}>
      <div className={styles.containerEnter}>
        <div className={styles.modal__block}>
         <form className={styles.modal__form}>
              {children}
            </form>
        </div>
      </div>
    </div>
    </AuthProvider>
    \</QueryClientProvider>
  );
}
