import { Button } from '../../atoms/index.js';
import './TaskReassignPanel.css';

export const TaskReassignPanel = ({ recent = [], onReassign, loading }) => (
  <div className="task-reassign-panel">
    <div className="task-reassign-panel__header">
      <h3>Reassignment</h3>
      <Button onClick={onReassign} disabled={loading}>
        {loading ? 'Balancing...' : 'Reassign Tasks'}
      </Button>
    </div>
    <ul>
      {recent.map((item) => (
        <li key={item.taskId}>
          <strong>{item.taskTitle}</strong> from {item.fromMember} to {item.toMember}
        </li>
      ))}
    </ul>
  </div>
);

