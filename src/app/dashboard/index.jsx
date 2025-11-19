import { useMemo, useState } from 'react';
import { DashboardTemplate } from '../../components/templates/index.js';
import { useTasks } from '../../hooks/useTasks.js';
import { useProjects } from '../../hooks/useProjects.js';
import { useTeams } from '../../hooks/useTeams.js';
import { useActivity } from '../../hooks/useActivity.js';
import { ReassignService } from '../../services/reassign.service.js';

export const DashboardPage = () => {
  const { tasks: taskList, fetchTasks, loading } = useTasks();
  const { projects } = useProjects();
  const { teams, membersByTeam, fetchMembers } = useTeams();
  const { logs, fetchLogs } = useActivity(5);
  const [recentReassignments, setRecentReassignments] = useState([]);
  const [reassignLoading, setReassignLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const allMembers = useMemo(() => Object.values(membersByTeam).flat(), [membersByTeam]);

  const tasksPreview = useMemo(() => taskList.slice(0, 5), [taskList]);

  const stats = useMemo(() => {
    const overloadedCount = allMembers.filter((member) => member.current_tasks > member.capacity).length;
    return {
      totalProjects: projects.length,
      totalTasks: taskList.length,
      overloadedCount,
    };
  }, [projects, taskList, allMembers]);

  const refreshMemberLoads = async () => {
    await Promise.all(teams.map((team) => fetchMembers(team.id)));
  };

  const handleReassign = async () => {
    try {
      setReassignLoading(true);
      const { data } = await ReassignService.rebalance();
      setRecentReassignments(data.reassignments.slice(0, 5));
      await fetchTasks();
      await refreshMemberLoads();
      await fetchLogs(5);
      if (data.reassignments.length) {
        setFeedback({
          status: 'success',
          title: 'Tasks reassigned',
          description: `${data.reassignments.length} tasks moved to balance capacity.`,
        });
      } else if (data.hadOverload && !data.hadCapacity) {
        setFeedback({
          status: 'warning',
          title: 'No free capacity',
          description: 'All members are at or over capacity. Add capacity or free up tasks.',
        });
      } else if (data.hadOverload && data.hadCapacity) {
        setFeedback({
          status: 'info',
          title: 'Only high priority tasks remain',
          description: 'High priority tasks stay with current owners. Reassign lower priority work first.',
        });
      } else {
        setFeedback({
          status: 'info',
          title: 'Already balanced',
          description: 'Every member is within capacity. No changes needed.',
        });
      }
    } catch (error) {
      setFeedback({
        status: 'error',
        title: 'Reassignment failed',
        description: error?.response?.data?.message || 'Please try again.',
      });
    } finally {
      setReassignLoading(false);
    }
  };

  return (
    <DashboardTemplate
      stats={stats}
      tasks={tasksPreview}
      members={allMembers}
      recentReassignments={recentReassignments}
      logs={logs}
      onReassign={handleReassign}
      reassignLoading={reassignLoading || loading}
      onEditTask={() => {}}
      onDeleteTask={() => {}}
      feedback={feedback}
      onDismissFeedback={() => setFeedback(null)}
    />
  );
};

