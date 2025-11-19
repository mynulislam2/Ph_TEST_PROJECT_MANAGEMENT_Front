import { formatTime } from '../../../utils/formatTime.js';
import './ActivityLogItem.css';

export const ActivityLogItem = ({ log }) => (
  <div className="activity-log-item">
    <p>{log.message}</p>
    <span>{formatTime(log.created_at)}</span>
  </div>
);

