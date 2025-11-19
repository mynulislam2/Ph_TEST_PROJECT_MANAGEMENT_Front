import { api } from './api.js';

export const ProjectService = {
  list: () => api.get('/projects'),
  create: (payload) => api.post('/projects', payload),
  get: (projectId) => api.get(`/projects/${projectId}`),
  update: (projectId, payload) => api.patch(`/projects/${projectId}`, payload),
};

