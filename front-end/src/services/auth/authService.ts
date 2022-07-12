import { tokenService } from '../tokenService';
import { api } from '../api';

interface ILogin {
  email: string
  password: string
}

export const authService = {
  // Login
  async login({ email, password }: ILogin) {
    const { data } = await api.post('/login', { email, password })

    tokenService.save(data.token);

    return data
  },
  // Student Actions
  async getSession(ctx = null) {
    const token = tokenService.get(ctx);

    const { data} = await api.post('/session', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    return data
  }
};
