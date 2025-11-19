import { MemberCapacityRow } from '../../molecules/index.js';
import './TeamList.css';

export const TeamList = ({ members = [] }) => (
  <div className="team-list">
    {members.map((member) => (
      <MemberCapacityRow key={member.id} member={member} />
    ))}
  </div>
);

