import { TaskCard } from '../../molecules/index.js';
import './TaskList.css';

export const TaskList = ({ tasks = [], onEdit, onDelete }) => (
  <div className="task-list">
    {tasks.map((task) => (
      <TaskCard key={task.id} task={task} onEdit={onEdit} onDelete={onDelete} />
    ))}
  </div>
);

