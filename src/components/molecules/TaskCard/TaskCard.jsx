import { Badge, Chip, Typography, Avatar } from '../../atoms/index.js';
import './TaskCard.css';

export const TaskCard = ({ task, onEdit, onDelete }) => (
  <div className="task-card">
    <div className="task-card__header">
      <Typography variant="title">{task.title}</Typography>
      <Chip label={task.status} />
    </div>
    <p className="task-card__description">{task.description}</p>
    <div className="task-card__meta">
      <Badge label={task.priority} variant={task.priority} />
      {task.member_name ? (
        <div className="task-card__assignee">
          <Avatar name={task.member_name} />
          <span>{task.member_name}</span>
        </div>
      ) : (
        <span className="task-card__unassigned">Unassigned</span>
      )}
    </div>
    <div className="task-card__actions">
      <button type="button" onClick={() => onEdit(task)}>
        Edit
      </button>
      <button type="button" onClick={() => onDelete(task.id)}>
        Delete
      </button>
    </div>
  </div>
);

