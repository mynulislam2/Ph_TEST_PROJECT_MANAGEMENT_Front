import { MemberCapacityRow } from '../../molecules/index.js';
import './TeamSummaryPanel.css';

export const TeamSummaryPanel = ({ members = [] }) => (
  <div className="team-summary-panel">
    <div className="team-summary-panel__header">
      <p>Team summary</p>
      <span>{members.length} members</span>
    </div>
    <div className="team-summary-panel__list">
      {members.length ? (
        members.map((member) => <MemberCapacityRow key={member.id} member={member} />)
      ) : (
        <p className="team-summary-panel__empty">Add members to your teams to see capacity.</p>
      )}
    </div>
  </div>
);

