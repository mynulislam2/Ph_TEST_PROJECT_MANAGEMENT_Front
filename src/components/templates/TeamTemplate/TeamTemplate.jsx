import { Button } from '../../atoms/index.js';
import { TeamList } from '../../organisms/index.js';
import './TeamTemplate.css';

export const TeamTemplate = ({
  teams,
  members,
  onOpenCreateTeam,
  onOpenAddMember,
  children,
}) => (
  <div className="team-template">
    <div className="team-template__toolbar card">
      <div>
        <p>Teams</p>
        <h2>Build squads and balance capacity</h2>
      </div>
      <div className="team-template__actions">
        <Button variant="ghost" onClick={onOpenAddMember}>
          Add Member
        </Button>
        <Button onClick={onOpenCreateTeam}>+ New Team</Button>
      </div>
    </div>
    <div className="team-template__members">
      {teams.map((team) => (
        <div key={team.id} className="team-template__card">
          <div className="team-template__card-header">
            <div>
              <h3>{team.name}</h3>
              {team.description && <p>{team.description}</p>}
            </div>
            <span>{team.member_count || 0} members</span>
          </div>
          <TeamList members={members[team.id] || []} />
        </div>
      ))}
      {!teams.length && <p className="team-template__empty">Create your first team to get started.</p>}
    </div>
    {children}
  </div>
);

