
import { useMutation } from '@tanstack/react-query';
import { LoginResponse, LoginCredentials, mockLoginApi } from '../mock/mockApi';

export const useLogin = () => {

  return useMutation<LoginResponse, Error, LoginCredentials>({
    mutationFn: (credentials: LoginCredentials) => mockLoginApi(credentials),
   onError: (error: Error) => {
  console.error("useLogin error", error);
},
  });
};