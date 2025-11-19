import { create } from 'zustand';
import { TaskService } from '../services/task.service.js';

const sanitizeFilters = (filters = {}) =>
  Object.fromEntries(
    Object.entries(filters).filter(
      ([, value]) => value !== '' && value !== null && value !== undefined,
    ),
  );

export const useTaskStore = create((set, get) => ({
  tasks: [],
  filters: {},
  loading: false,
  warning: null,
  async fetchTasks(filters = {}) {
    const params = sanitizeFilters(filters);
    set({ loading: true, filters });
    const { data } = await TaskService.list(params);
    set({ tasks: data, loading: false });
    return data;
  },
  async createTask(payload) {
    const { data } = await TaskService.create(payload);
    set({ tasks: [data.task, ...get().tasks], warning: data.warning });
    return data;
  },
  async updateTask(taskId, payload) {
    const { data } = await TaskService.update(taskId, payload);
    set((state) => ({
      tasks: state.tasks.map((task) => (task.id === taskId ? data.task : task)),
      warning: data.warning,
    }));
    return data;
  },
  async removeTask(taskId) {
    await TaskService.remove(taskId);
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== taskId),
    }));
  },
  async autoAssign(projectId) {
    const { data } = await TaskService.autoAssign({ projectId });
    return data;
  },
}));

