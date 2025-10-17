
'use client'
import { ReactNode, useEffect, useState } from 'react';
import styles from './layout.module.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

interface AuthLayoutProps {
  children: ReactNode;
}


export default function AuthLayout({ children }: AuthLayoutProps) {
  const queryClient = new QueryClient();
  const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
    setIsLoading(false);
  }, []);


  return (
     <QueryClientProvider client={queryClient}>
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
    </div></QueryClientProvider>
  );
}
