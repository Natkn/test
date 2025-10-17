'use client';

import styles from './signin.module.css';
import classNames from 'classnames';
import Image from 'next/image';
import { ChangeEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLogin } from '@/app/hooks/useLoginMutation';


export default function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);


const loginMutation = useLogin(); 

  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== 'undefined') {
      const storedToken = localStorage.getItem('authToken');
      if (storedToken) {
        router.push('/auth/signup');
      }
    }
  }, [router]);

  

const handleLogin = async () => {
  setErrorMessage('');
  try {
    await loginMutation.mutateAsync({ email, password });
     router.push('/auth/signup');
  } catch (error) {
    if (error instanceof Error) {
      const status = (error as any).status;
      switch (status) {
        case 400:
          setErrorMessage( error.message);
          break;
        case 401:
          setErrorMessage( error.message);
          break;
        case 500:
          setErrorMessage('Internal server error. Please try again later.');
          break;
        case 503:
          setErrorMessage('Service unavailable. Please check your network.');
          break;
        default:
          setErrorMessage(error.message);
      }
    } else {
      setErrorMessage('Unknown error occurred');
    }
  }
};

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  if (!isMounted) {
    return null;
  }
  return (
    <>
      <a href="/auth/signin">
        <div className={styles.modal__logo}>
          <Image
            width={24}
            height={24}
            className={styles.logo__modal}
            src="/logo.svg"
            alt="logo"
          />
        </div>
      </a>

      <div className={styles.modal__title}>
        <div className={styles.title}>Sign in to your account to continue</div>
      </div>

      <div className={styles.modal__inputs}>
        <Image
          width={16}
          height={16}
          className={styles.logo__modal}
          src="/user.svg"
          alt="user icon"
        />
        <input
          className={classNames(styles.modal__input, styles.login)}
          type="text"
          placeholder="Email"
          onChange={onChangeEmail}
        />
      </div>

      <div className={styles.modal__inputs}>
        <Image
          width={16}
          height={16}
          className={styles.logo__modal}
          src="/lock.svg"
          alt="lock icon"
        />
        <input
          className={styles.modal__input}
          type="password"
          placeholder="Password"
          onChange={onChangePassword}
        />
      </div>

<div className={styles.errorContainer}>
  {errorMessage}
</div>

      <button 
        type="button" 
        className={styles.modal__btnEnter}
        onClick={handleLogin}
        disabled={loginMutation.isLoading}
        
      >
        {loginMutation.isLoading ? 'Logging in...' : 'Log in'}
      </button>

    </>
  );
}