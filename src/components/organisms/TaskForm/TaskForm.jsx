import { useEffect, useMemo, useState } from 'react';
import { Button, Input, Select } from '../../atoms/index.js';
import { TASK_PRIORITY } from '../../../constants/taskPriority.js';
import { TASK_STATUS } from '../../../constants/taskStatus.js';
import './TaskForm.css';

const buildDefaults = (projects) => ({
  projectId: projects[0]?.id || '',
  title: '',
  description: '',
  memberId: '',
  priority: 'Medium',
  status: 'Pending',
});

export const TaskForm = ({
  projects = [],
  membersByTeam = {},
  initialValues,
  onSubmit,
  onAutoAssign,
  onCancel,
  submitLabel = 'Create Task',
}) => {
  const [form, setForm] = useState({ ...buildDefaults(projects), ...initialValues });

  useEffect(() => {
    if (initialValues) {
      setForm({ ...buildDefaults(projects), ...initialValues });
    } else {
      setForm((prev) => ({
        ...prev,
        projectId: prev.projectId || projects[0]?.id || '',
      }));
    }
  }, [initialValues, projects]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const selectedProject = useMemo(
    () => projects.find((project) => project.id === form.projectId),
    [projects, form.projectId],
  );

  const teamMembers = selectedProject ? membersByTeam[selectedProject.team_id] || [] : [];

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(form);
  };

  const handleAutoAssign = async () => {
    if (!form.projectId) return;
    const suggestion = await onAutoAssign(form.projectId);
    if (suggestion) {
      setForm((prev) => ({ ...prev, memberId: suggestion.memberId }));
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <Select
        label="Project"
        name="projectId"
        value={form.projectId}
        onChange={handleChange}
        options={projects.map((project) => ({ label: project.name, value: project.id }))}
      />
      <Input label="Title" name="title" value={form.title} onChange={handleChange} required />
      <Input
        label="Description"
        name="description"
        value={form.description}
        onChange={handleChange}
      />
      <Select
        label="Assign Member"
        name="memberId"
        value={form.memberId}
        onChange={handleChange}
        options={[
          { label: 'Unassigned', value: '' },
          ...teamMembers.map((member) => ({
            label: `${member.name} (${member.current_tasks}/${member.capacity})`,
            value: member.id,
          })),
        ]}
      />
      <Select
        label="Priority"
        name="priority"
        value={form.priority}
        onChange={handleChange}
        options={TASK_PRIORITY.map((priority) => ({ label: priority, value: priority }))}
      />
      <Select
        label="Status"
        name="status"
        value={form.status}
        onChange={handleChange}
        options={TASK_STATUS.map((status) => ({ label: status, value: status }))}
      />
      {teamMembers.length === 0 && selectedProject && (
        <p className="task-form__hint">No members on this project’s team yet.</p>
      )}
      <div className="task-form__actions">
        <Button type="button" variant="secondary" onClick={handleAutoAssign} disabled={!form.projectId}>
          Auto-assign
        </Button>
        <div className="task-form__actions-right">
          {onCancel && (
            <Button type="button" variant="ghost" onClick={onCancel}>
              Cancel
            </Button>
          )}
          <Button type="submit">{submitLabel}</Button>
        </div>
      </div>
    </form>
  );
};

