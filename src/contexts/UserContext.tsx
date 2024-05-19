import { checkUserAuthenticated } from '@/helpers/checkUserAuthenticated';
import { REFRESH_TOKEN, USER_GET, USER_LOGIN } from '@/server/api';
import { useRouter } from 'next/navigation';
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react';

type UserResponse = {
  message: {
    user_status: User;
  };
};

type UserContext = {
  refreshAccessToken: () => void;
  userLogin: (email: string, password: string) => void;
  userLogout: () => void;
  getLogin: () => void;
  loading: boolean;
  error: string | null;
  login: boolean | null;
  data: UserResponse | null;
  isAdmin: boolean;
  getUser: (token: string) => Promise<void>;
};

const UserContext = createContext<UserContext | null>(null);

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === null)
    throw new Error('userContext deve estar dentro do Provider');
  return context;
};

export const UserStorage = ({ children }: PropsWithChildren) => {
  const [data, setData] = useState<UserResponse | null>(null);
  const [login, setLogin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const { push } = useRouter();

  const userLogout = useCallback(async () => {
    setData(null);
    setLogin(false);
    window.localStorage.removeItem('refresh_token');
    window.localStorage.removeItem('access_token');
    push('/');
  }, [push]);

  async function getUser(token: string) {
    const { url, options } = USER_GET(token);
    const response = await fetch(url, options);
    const json = await response.json();
    setData(json);
    setLogin(true);
  }

  async function userLogin(email: string, password: string) {
    try {
      setError(null);
      setLoading(true);
      const { url, options } = USER_LOGIN({ email, password });
      const response = await fetch(url, options);
      const json = await response.json();
      if (json.detail) throw `${json.detail}`;
      const { access_token, refresh_token } = json;
      window.localStorage.setItem('access_token', access_token);
      window.localStorage.setItem('refresh_token', refresh_token);
      await getUser(access_token);
      push('/dashboard');
    } catch (err) {
      if (typeof err === 'string') {
        setError(err);
        setLogin(false);
      }
    } finally {
      setLoading(false);
    }
  }

  async function refreshAccessToken() {
    if (typeof window === 'undefined') return;
    const refreshToken = window.localStorage.getItem('refresh_token');
    if (refreshToken) {
      try {
        const { url, options } = REFRESH_TOKEN(refreshToken);
        const response = await fetch(url, options);
        if (!response.ok) throw new Error('Erro ao atualizar token.');
        const { access_token } = await response.json();
        window.localStorage.setItem('access_token', access_token);
      } catch (err) {
        userLogout();
      }
    } else userLogout();
  }

  const getLogin = useCallback(async () => {
    const token = checkUserAuthenticated();
    if (token) {
      try {
        setLoading(true);
        const { url, options } = USER_GET(token);
        const response = await fetch(url, options);
        if (!response.ok) throw new Error('Token inválido');
        await getUser(token);
      } catch (err) {
        refreshAccessToken();
      } finally {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    const intervalId = setInterval(
      () => {
        refreshAccessToken();
      },
      15 * 60 * 1000
    );

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    if (data && data?.message?.user_status?.acess === 1) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [data]);

  useEffect(() => {
    const token = checkUserAuthenticated();
    if (token) getUser(token);
  }, []);

  return (
    <UserContext.Provider
      value={{
        userLogin,
        loading,
        error,
        login,
        data,
        userLogout,
        getLogin,
        getUser,
        isAdmin,
        refreshAccessToken
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
