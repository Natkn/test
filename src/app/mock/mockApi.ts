
export interface LoginResponse {
  token: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export const mockLoginApi = async ({ email, password }: LoginCredentials): Promise<LoginResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 500));

   // 1. Проверяем, что поля не пустые
  if (!email || !password) {
    const error = new Error('Email and password are required');
    (error as any).status = 400;
    throw error;
  } 
  

  // 2. Проверка валидности email 
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    const error = new Error('Invalid email format');
    (error as any).status = 400; 
    throw error;
  }


  // 3. Имитируем случайную сетевую ошибку 
  if (Math.random() < 0.1) {
    const error = new Error('Network error, please try again');
    (error as any).status = 503;
    throw error;
  }

  // 4. Имитируем серверную ошибку 
  if (Math.random() < 0.05) {
    const error = new Error('Server error, please contact support');
    (error as any).status = 500;
    throw error;
  }

 if (email !== 'correct@ex.com' || password !== '12345') {
    if (email !== 'correct@ex.com' && password !== '12345') {
      const error = new Error('Incorrect email or password');
      (error as any).status = 401;
      throw error;
    } else if (email !== 'correct@ex.com') {
      const error = new Error('Incorrect email');
      (error as any).status = 401;
      throw error;
    } else {
      const error = new Error('Incorrect password');
      (error as any).status = 401;
      throw error;
    }
  }

  return { token: 'fake-token' };
};