import { api } from './api.js';

export const TeamService = {
  list: () => api.get('/teams'),
  create: (payload) => api.post('/teams', payload),
  listMembers: (teamId) => api.get(`/teams/${teamId}/members`),
  addMember: (teamId, payload) => api.post(`/teams/${teamId}/members`, payload),
};

