import { api } from './api.js';

export const TaskService = {
  list: (params) => api.get('/tasks', { params }),
  create: (payload) => api.post('/tasks', payload),
  update: (taskId, payload) => api.patch(`/tasks/${taskId}`, payload),
  remove: (taskId) => api.delete(`/tasks/${taskId}`),
  autoAssign: (payload) => api.post('/tasks/auto-assign', payload),
};

