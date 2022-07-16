const ACCESS_TOKEN_KEY = 'ACCESS_TOKEN_KEY';
import nookies from 'nookies';

export const tokenService = {
  save(accessToken: string, ctx = null) {
    nookies.set(ctx, ACCESS_TOKEN_KEY, accessToken, {
      maxAge: 1 * 60 * 60 * 24 * 1, // cookie expires in 1 day
      path: '/',
    });
  },
  async get(ctx = null) {
    const cookies = nookies.get(ctx);
    return cookies[ACCESS_TOKEN_KEY] || '';
  },
  delete(ctx = null) {
    nookies.destroy(ctx, ACCESS_TOKEN_KEY);
  }
}
