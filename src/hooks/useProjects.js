import { useEffect } from 'react';
import { useProjectStore } from '../store/project.store.js';

export const useProjects = () => {
  const projects = useProjectStore((state) => state.projects);
  const activeProject = useProjectStore((state) => state.activeProject);
  const loading = useProjectStore((state) => state.loading);
  const fetchProjects = useProjectStore((state) => state.fetchProjects);
  const createProject = useProjectStore((state) => state.createProject);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return { projects, activeProject, loading, fetchProjects, createProject };
};

