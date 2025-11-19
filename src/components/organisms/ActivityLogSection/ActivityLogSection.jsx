import { ActivityLogItem } from '../../molecules/index.js';
import './ActivityLogSection.css';

export const ActivityLogSection = ({ logs = [] }) => (
  <div className="activity-log-section">
    <div className="activity-log-section__header">
      <div>
        <p>Recent activity</p>
        <span>Latest updates from reassignments</span>
      </div>
    </div>
    {logs.map((log) => (
      <ActivityLogItem key={log.id} log={log} />
    ))}
    {!logs.length && <p className="activity-log-section__empty">No activity yet.</p>}
  </div>
);

