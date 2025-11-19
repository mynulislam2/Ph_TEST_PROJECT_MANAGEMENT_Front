import { useEffect } from 'react';
import { useTaskStore } from '../store/task.store.js';

export const useTasks = (filters) => {
  const tasks = useTaskStore((state) => state.tasks);
  const loading = useTaskStore((state) => state.loading);
  const warning = useTaskStore((state) => state.warning);
  const fetchTasks = useTaskStore((state) => state.fetchTasks);
  const createTask = useTaskStore((state) => state.createTask);
  const updateTask = useTaskStore((state) => state.updateTask);
  const removeTask = useTaskStore((state) => state.removeTask);
  const autoAssign = useTaskStore((state) => state.autoAssign);

  useEffect(() => {
    fetchTasks(filters || {});
  }, [fetchTasks, JSON.stringify(filters)]);

  return { tasks, loading, warning, fetchTasks, createTask, updateTask, removeTask, autoAssign };
};

