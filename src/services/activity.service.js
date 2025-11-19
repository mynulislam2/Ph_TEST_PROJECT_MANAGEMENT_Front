import { api } from './api.js';

export const ActivityService = {
  list: (limit = 5) => api.get('/activity', { params: { limit } }),
};

