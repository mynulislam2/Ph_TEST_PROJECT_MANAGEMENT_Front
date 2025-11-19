import { create } from 'zustand';
import { ActivityService } from '../services/activity.service.js';

export const useActivityStore = create((set) => ({
  logs: [],
  loading: false,
  async fetchLogs(limit = 5) {
    set({ loading: true });
    const { data } = await ActivityService.list(limit);
    set({ logs: data, loading: false });
    return data;
  },
}));

