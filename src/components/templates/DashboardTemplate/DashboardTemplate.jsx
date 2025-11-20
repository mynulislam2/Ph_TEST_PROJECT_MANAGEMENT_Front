import { Link } from 'react-router-dom';
import { Button } from '../../atoms/index.js';
import {
  ActivityLogSection,
  DashboardSummary,
  TaskList,
  TaskReassignPanel,
  TeamSummaryPanel,
} from '../../organisms/index.js';
import './DashboardTemplate.css';

export const DashboardTemplate = ({
  stats,
  tasks,
  recentReassignments,
  logs,
  members,
  onReassign,
  reassignLoading,
  onEditTask,
  onDeleteTask,
  feedback,
  onDismissFeedback,
}) => (
  <div className="dashboard-template">
    <div className="dashboard-template__hero">
      <div>
        <p>Welcome back</p>
        <h1>Stay ahead of workload spikes</h1>
        <span>Monitor team capacity in real time and auto-balance tasks before deadlines slip.</span>
      </div>
      <div className="dashboard-template__hero-actions">
        <Button variant="primary">Create Task</Button>
        <Button variant="ghost" onClick={onReassign} disabled={reassignLoading}>
          Quick Rebalance
        </Button>
      </div>
    </div>
    <DashboardSummary stats={stats} />
    <div className="dashboard-template__grid">
      <div className="dashboard-template__tasks-preview card">
        <div className="dashboard-template__tasks-header">
          <div>
            <p>Recent tasks</p>
            <span>Showing the latest updates</span>
          </div>
          <Link to="/tasks" className="dashboard-template__view-all">
            View all
          </Link>
        </div>
        <TaskList tasks={tasks} onEdit={onEditTask} onDelete={onDeleteTask} />
      </div>
      <div className="dashboard-template__side">
        <TeamSummaryPanel members={members} />
        <TaskReassignPanel recent={recentReassignments} onReassign={onReassign} loading={reassignLoading} />
        <ActivityLogSection logs={logs} />
      </div>
    </div>
    {feedback && (
      <div className="dashboard-template__modal">
        <div className={`dashboard-template__feedback ${feedback.status}`}>
          <h3>{feedback.title}</h3>
          <p>{feedback.description}</p>
          <div className="dashboard-template__feedback-actions">
            <Button variant="ghost" onClick={onDismissFeedback}>
              Close
            </Button>
          </div>
        </div>
      </div>
    )}
  </div>
);

