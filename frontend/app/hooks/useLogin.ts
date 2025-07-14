import { useMutation } from '@tanstack/react-query';
import { login } from '../services/UserAuthentication';




export const useLogin = () => {
    return useMutation({
        mutationFn:({ username, password }: { username: string; password:string }) =>
        login(username,password),
    });
};



