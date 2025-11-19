import { api } from './api.js';

export const ReassignService = {
  rebalance: () => api.post('/reassign'),
};

