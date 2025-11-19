import { useMemo, useState } from 'react';
import { Button } from '../../components/atoms/index.js';
import { TaskForm } from '../../components/organisms/index.js';
import { TaskTemplate } from '../../components/templates/index.js';
import { useTasks } from '../../hooks/useTasks.js';
import { useProjects } from '../../hooks/useProjects.js';
import { useTeams } from '../../hooks/useTeams.js';
import { useSearchStore } from '../../store/search.store.js';

export const TasksPage = () => {
  const [filters, setFilters] = useState({ projectId: '', memberId: '' });
  const [modalState, setModalState] = useState({ open: false, mode: 'create', task: null });
  const [warning, setWarning] = useState(null);
  const [pendingAction, setPendingAction] = useState(null);

  const { tasks, createTask, updateTask, removeTask, autoAssign, fetchTasks } = useTasks(filters);
  const searchQuery = useSearchStore((state) => state.query.trim().toLowerCase());
  const { projects } = useProjects();
  const { membersByTeam, fetchMembers } = useTeams();

  const memberOptions = useMemo(() => Object.values(membersByTeam).flat(), [membersByTeam]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const closeModal = () => setModalState({ open: false, mode: 'create', task: null });
  const openCreateModal = () => setModalState({ open: true, mode: 'create', task: null });
  const openEditModal = (task) => setModalState({ open: true, mode: 'edit', task });

  const findProjectById = (projectId) => projects.find((project) => project.id === projectId);

  const refreshMembersForProject = async (projectId) => {
    const project = findProjectById(projectId);
    if (project) {
      await fetchMembers(project.team_id);
    }
  };

  const getMemberLoad = (projectId, memberId) => {
    if (!projectId || !memberId) return null;
    const project = findProjectById(projectId);
    if (!project) return null;
    const teamMembers = membersByTeam[project.team_id] || [];
    return teamMembers.find((member) => member.id === memberId);
  };

  const executeAction = async ({ type, payload }) => {
    try {
      if (type === 'create') {
        await createTask(payload);
        await refreshMembersForProject(payload.projectId);
      } else if (type === 'update') {
        await updateTask(payload.id, payload.data);
        await refreshMembersForProject(payload.data.projectId);
        if (
          payload.previousProjectId &&
          payload.previousProjectId !== payload.data.projectId
        ) {
          await refreshMembersForProject(payload.previousProjectId);
        }
      }
      closeModal();
      await fetchTasks(filters);
    } catch (error) {
      console.error('Unable to save task', error);
    }
  };

  const maybeWarnAndExecute = ({ type, payload }, options = {}) => {
    const memberId = type === 'create' ? payload.memberId : payload.data.memberId;
    const projectId = type === 'create' ? payload.projectId : payload.data.projectId;
    if (!memberId || options.skipWarning) {
      executeAction({ type, payload });
      return;
    }

    const member = getMemberLoad(projectId, memberId);
    if (member && member.current_tasks >= member.capacity) {
      setPendingAction({ type, payload });
      setWarning({
        message: `${member.name} has ${member.current_tasks} tasks but capacity is ${member.capacity}.`,
      });
      return;
    }
    executeAction({ type, payload });
  };

  const handleCreateSubmit = (formValues) => {
    maybeWarnAndExecute({
      type: 'create',
      payload: {
        ...formValues,
        memberId: formValues.memberId || null,
      },
    });
  };

  const handleEditSubmit = (formValues) => {
    if (!modalState.task) return;
    const normalizedMemberId = formValues.memberId || null;
    const unchangedAssignee =
      modalState.task.member_id === normalizedMemberId &&
      modalState.task.project_id === formValues.projectId;
    maybeWarnAndExecute({
      type: 'update',
      payload: {
        id: modalState.task.id,
        previousProjectId: modalState.task.project_id,
        data: {
          ...formValues,
          memberId: normalizedMemberId,
        },
      },
    }, { skipWarning: unchangedAssignee });
  };

  const handleDeleteTask = async (taskId) => {
    const task = tasks.find((item) => item.id === taskId);
    if (!task) return;
    if (!window.confirm('Delete this task?')) return;
    await removeTask(taskId);
    await refreshMembersForProject(task.project_id);
    await fetchTasks(filters);
  };

  const handleWarningConfirm = () => {
    if (!pendingAction) return;
    setWarning(null);
    executeAction(pendingAction);
    setPendingAction(null);
  };

  const handleWarningCancel = () => {
    setWarning(null);
    setPendingAction(null);
  };

  const editingInitialValues =
    modalState.mode === 'edit' && modalState.task
      ? {
          projectId: modalState.task.project_id,
          title: modalState.task.title,
          description: modalState.task.description || '',
          memberId: modalState.task.member_id || '',
          priority: modalState.task.priority,
          status: modalState.task.status,
        }
      : undefined;

  const filteredTasks = useMemo(() => {
    if (!searchQuery) return tasks;
    return tasks.filter((task) => {
      const target = `${task.title} ${task.description ?? ''} ${task.member_name ?? ''}`.toLowerCase();
      return target.includes(searchQuery);
    });
  }, [tasks, searchQuery]);

  return (
    <TaskTemplate
      tasks={filteredTasks}
      projects={projects}
      members={memberOptions}
      filters={filters}
      onFilterChange={handleFilterChange}
      onOpenCreate={openCreateModal}
      onEditTask={openEditModal}
      onDeleteTask={handleDeleteTask}
    >
      {modalState.open && (
        <div className="task-template__modal">
          <div className="task-template__modal-card">
            <TaskForm
              projects={projects}
              membersByTeam={membersByTeam}
              initialValues={editingInitialValues}
              onSubmit={modalState.mode === 'edit' ? handleEditSubmit : handleCreateSubmit}
              onAutoAssign={autoAssign}
              onCancel={closeModal}
              submitLabel={modalState.mode === 'edit' ? 'Update Task' : 'Create Task'}
            />
          </div>
        </div>
      )}
      {warning && (
        <div className="task-template__modal">
          <div className="task-template__warning-card">
            <h4>Capacity warning</h4>
            <p>{warning.message}</p>
            <div className="task-template__warning-actions">
              <Button variant="ghost" onClick={handleWarningCancel}>
                Choose Another
              </Button>
              <Button onClick={handleWarningConfirm}>Assign Anyway</Button>
            </div>
          </div>
        </div>
      )}
    </TaskTemplate>
  );
};

