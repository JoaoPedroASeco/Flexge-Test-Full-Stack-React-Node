import { tokenService } from '../token/tokenService';
import { api } from '../api';

interface ILogin {
  email: string
  password: string
}

export const authService = {
  // Login
  async login({ email, password }: ILogin) {
    const { data } = await api.post('login', { email, password })

    tokenService.save(data.token);

    return data
  },
};
