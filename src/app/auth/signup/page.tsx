'use client';

import { Suspense } from 'react';
import { useState, useRef, useEffect, useCallback } from 'react';
import classNames from 'classnames';
import styles from './signup.module.css';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useAuthContext } from '../authContext';

const SignUpContent = () => {
  const searchParams = useSearchParams();
  const initialCode = searchParams.get('code') || '';
  const { onComplete } = useAuthContext();
  const NUM_INPUTS = 6;
  const VALID_CODE = '123456';

  const [code, setCode] = useState(() => Array(NUM_INPUTS).fill(''));
  const [buttonText, setButtonText] = useState('');
  const [isError, setIsError] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, NUM_INPUTS);
  }, []);

  useEffect(() => {
    if (initialCode.length === NUM_INPUTS) {
      setCode(initialCode.split(''));
    }
  }, [initialCode]);

  // Меняем текст кнопки через 10 секунд после монтирования компонента
  useEffect(() => {
    const timer = setTimeout(() => setButtonText('Get new'), 10000);
    return () => clearTimeout(timer);
  }, []);

  const validateCode = useCallback((codeStr: string): boolean => codeStr === VALID_CODE, []);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
      const value = e.target.value;
      if (value.length > 1 || !/^\d*$/.test(value)) return;

      setCode(prev => {
        const newCode = [...prev];
        newCode[index] = value;
        return newCode;
      });

      if (value && index < NUM_INPUTS - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    },
    [NUM_INPUTS]
  );

  useEffect(() => {
    if (code.every(d => d !== '')) {
      const codeStr = code.join('');
      const valid = validateCode(codeStr);

      if (valid) {
        setIsError(false);
        setButtonText('Continue');
        onComplete?.(codeStr);
      } else {
        setIsError(true);
        setButtonText('Continue');
      }
    } else {
      if (buttonText === 'Continue') setButtonText('Get new');
      setIsError(false);
    }
  }, [code, validateCode, onComplete, buttonText]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
      if (e.key === 'Backspace' && !code[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    },
    [code]
  );

  const handlePaste = useCallback(
    (e: React.ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      const pasteData = e.clipboardData.getData('text').trim();

      if (pasteData.length === NUM_INPUTS && /^\d+$/.test(pasteData)) {
        const newCode = pasteData.split('');
        setCode(newCode);

        const valid = validateCode(pasteData);
        setIsError(!valid);
        setButtonText('Continue');

        if (valid) {
          onComplete?.(pasteData);
        }

        inputRefs.current[NUM_INPUTS - 1]?.focus();
      }
    },
    [validateCode, onComplete]
  );

  return (
    <div className={styles.container}>
      <div className={styles.arrow}>
        <a href="/auth/signin" aria-label="Go back to sign in">
          <Image
            width={18}
            height={18}
            className={styles.logo__modal}
            src="/test/images/ArrowLeft.svg"
            alt="Arrow Left"
          />
        </a>
      </div>

      <div className={styles.modal__logo}>
        <Image
          width={98}
          height={24}
          className={styles.logo__modal}
          src="/test/images/logo.svg"
          alt="Logo"
        />
      </div>

      <div className={styles.block}>
        <h2 className={styles.title}>Two-Factor Authentication</h2>
      </div>

      <div className={styles.subtitle}>
        Enter the 6-digit code from the Google Authenticator app
      </div>

      <div
        className={styles.codeInputWrapper}
        onPaste={handlePaste}
        role="group"
        aria-label="Authentication code input"
      >
        {code.map((digit, i) => (
          <input
            key={i}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={1}
            value={digit}
            onChange={e => handleChange(e, i)}
            onKeyDown={e => handleKeyDown(e, i)}
            ref={(el: HTMLInputElement | null): void => {
              inputRefs.current[i] = el;
            }}
            className={classNames(styles.codeInputBox, {
              [styles.codeFilled]: digit !== '',
              [styles.codeError]: isError,
            })}
            autoComplete="one-time-code"
            aria-label={`Digit ${i + 1}`}
          />
        ))}
      </div>

      {isError && (
        <div className={styles.errorMessage} role="alert">
          Invalid code
        </div>
      )}

      {buttonText && (
        <button
          type="button"
          className={styles.modal__btnEnter}
          disabled={buttonText === 'Continue' && isError}
        >
          {buttonText}
        </button>
      )}
    </div>
  );
};

const SignUp = () => {
  return (
    <Suspense fallback={<div>Loading form...</div>}>
      <SignUpContent />
    </Suspense>
  );
};

export default SignUp; 