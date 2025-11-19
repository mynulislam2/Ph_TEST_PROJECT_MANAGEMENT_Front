import { useEffect } from 'react';
import { useUserStore } from '../store/user.store.js';

export const useAuth = () => {
  const user = useUserStore((state) => state.user);
  const token = useUserStore((state) => state.token);
  const loading = useUserStore((state) => state.loading);
  const error = useUserStore((state) => state.error);
  const login = useUserStore((state) => state.login);
  const register = useUserStore((state) => state.register);
  const logout = useUserStore((state) => state.logout);
  const initialize = useUserStore((state) => state.initialize);

  useEffect(() => {
    if (token && !user) {
      initialize();
    }
  }, [token, user, initialize]);

  return { user, token, loading, error, login, register, logout, isAuthenticated: Boolean(token) };
};

