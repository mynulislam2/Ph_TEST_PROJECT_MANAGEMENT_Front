import { create } from 'zustand';
import { AuthService } from '../services/auth.service.js';

export const useUserStore = create((set) => ({
  user: null,
  token: localStorage.getItem('stm_token'),
  loading: false,
  error: null,
  async login(credentials) {
    set({ loading: true, error: null });
    try {
      const { data } = await AuthService.login(credentials);
      localStorage.setItem('stm_token', data.token);
      set({ user: data.user, token: data.token, loading: false });
      return data.user;
    } catch (error) {
      set({ error: error.response?.data?.message || 'Login failed', loading: false });
      throw error;
    }
  },
  async register(payload) {
    set({ loading: true, error: null });
    try {
      const { data } = await AuthService.register(payload);
      localStorage.setItem('stm_token', data.token);
      set({ user: data.user, token: data.token, loading: false });
      return data.user;
    } catch (error) {
      set({ error: error.response?.data?.message || 'Register failed', loading: false });
      throw error;
    }
  },
  async initialize() {
    const token = localStorage.getItem('stm_token');
    if (!token) return;
    set({ loading: true });
    try {
      const { data } = await AuthService.me();
      set({ user: data.user, token, loading: false });
    } catch (error) {
      localStorage.removeItem('stm_token');
      set({ user: null, token: null, loading: false });
    }
  },
  logout() {
    localStorage.removeItem('stm_token');
    set({ user: null, token: null });
  },
}));

