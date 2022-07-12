import { useEffect, useState } from 'react';
import { authService } from './authService';

export function useSession() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    authService.getSession()
      .then((userSession) => {
        console.log(userSession);
        setSession(userSession);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return {
    data: {
      session,
    },
    error,
    loading,
  }
}

export function withSessionHOC(Component: any) {
  return function Wrapper(props: any) {
    const session = useSession();
    
    if(!session.loading && session.error) {
      console.log('redireciona o usuário para a home');
      window.location.href ='/?error=401'
    }

    const modifiedProps = {
      ...props,
      session: session.data.session,
    }
    
    return (
      <Component {...modifiedProps} />
    )
  }
}
