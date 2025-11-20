import { Button, Select } from '../../atoms/index.js';
import { TaskList } from '../../organisms/index.js';
import './TaskTemplate.css';

export const TaskTemplate = ({
  tasks,
  projects,
  members,
  filters,
  onFilterChange,
  onOpenCreate,
  onEditTask,
  onDeleteTask,
  children,
}) => (
  <div className="task-template">
    <div className="task-template__toolbar">
      <div className="task-template__filters">
        <Select
          label="Project"
          name="project"
          value={filters.projectId}
          onChange={(event) => onFilterChange('projectId', event.target.value)}
          options={[{ label: 'All projects', value: '' }, ...projects.map((project) => ({ label: project.name, value: project.id }))]}
        />
        <Select
          label="Member"
          name="member"
          value={filters.memberId}
          onChange={(event) => onFilterChange('memberId', event.target.value)}
          options={[
            { label: 'All members', value: '' },
            ...members.map((member) => ({
              label: `${member.name} (${member.current_tasks}/${member.capacity})`,
              value: member.id,
            })),
          ]}
        />
      </div>
      <div className="task-template__actions">
        <Button
          variant="ghost"
          onClick={() => {
            onFilterChange('projectId', '');
            onFilterChange('memberId', '');
          }}
        >
          Clear filters
        </Button>
        <Button onClick={onOpenCreate}>+ New Task</Button>
      </div>
    </div>
    {tasks.length ? (
      <TaskList tasks={tasks} onEdit={onEditTask} onDelete={onDeleteTask} />
    ) : (
      <div className="task-template__empty card">
        <p>No tasks match your filters/search.</p>
        <Button variant="secondary" onClick={onOpenCreate}>
          Add Task
        </Button>
      </div>
    )}
    {children}
  </div>
);

