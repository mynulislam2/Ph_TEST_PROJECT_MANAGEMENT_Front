import { create } from 'zustand';
import { ProjectService } from '../services/project.service.js';

export const useProjectStore = create((set, get) => ({
  projects: [],
  activeProject: null,
  loading: false,
  async fetchProjects() {
    set({ loading: true });
    const { data } = await ProjectService.list();
    set({ projects: data, loading: false });
    return data;
  },
  async createProject(payload) {
    const { data } = await ProjectService.create(payload);
    set({ projects: [data, ...get().projects] });
    return data;
  },
  async fetchProject(projectId) {
    if (!projectId) return null;
    const { data } = await ProjectService.get(projectId);
    set({ activeProject: data });
    return data;
  },
}));

