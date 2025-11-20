import { useEffect } from 'react';
import { useActivityStore } from '../store/activity.store.js';

export const useActivity = (limit = 6) => {
  const logs = useActivityStore((state) => state.logs);
  const loading = useActivityStore((state) => state.loading);
  const fetchLogs = useActivityStore((state) => state.fetchLogs);

  useEffect(() => {
    fetchLogs(limit);
  }, [fetchLogs, limit]);

  return { logs, loading, fetchLogs };
};

