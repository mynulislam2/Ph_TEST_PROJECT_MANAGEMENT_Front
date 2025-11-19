import { useEffect, useState } from 'react';
import { Button, Input, Select } from '../../components/atoms/index.js';
import { TeamTemplate } from '../../components/templates/index.js';
import { useTeams } from '../../hooks/useTeams.js';
import { ROLES } from '../../constants/roles.js';

export const TeamsPage = () => {
  const { teams, membersByTeam, createTeam, addMember, fetchMembers } = useTeams();
  const [modal, setModal] = useState(null); // 'team' | 'member' | null
  const [teamForm, setTeamForm] = useState({ name: '', description: '' });
  const [memberForm, setMemberForm] = useState({
    teamId: '',
    name: '',
    role: ROLES[0],
    capacity: 3,
  });

  useEffect(() => {
    if (teams.length && !memberForm.teamId) {
      setMemberForm((prev) => ({ ...prev, teamId: teams[0].id }));
    }
  }, [teams, memberForm.teamId]);

  const closeModal = () => setModal(null);

  const handleCreateTeam = async (event) => {
    event.preventDefault();
    await createTeam(teamForm);
    setTeamForm({ name: '', description: '' });
    closeModal();
  };

  const handleAddMember = async (event) => {
    event.preventDefault();
    if (!memberForm.teamId) return;
    await addMember(memberForm.teamId, {
      name: memberForm.name,
      role: memberForm.role,
      capacity: Number(memberForm.capacity),
    });
    await fetchMembers(memberForm.teamId);
    setMemberForm((prev) => ({ ...prev, name: '' }));
    closeModal();
  };

  return (
    <TeamTemplate
      teams={teams}
      members={membersByTeam}
      onOpenCreateTeam={() => setModal('team')}
      onOpenAddMember={() => setModal('member')}
    >
      {modal === 'team' && (
        <div className="team-template__modal">
          <div className="team-template__modal-card">
            <form onSubmit={handleCreateTeam} className="team-form-modal">
              <h3>Create Team</h3>
              <Input
                label="Team Name"
                name="name"
                value={teamForm.name}
                onChange={(event) => setTeamForm((prev) => ({ ...prev, name: event.target.value }))}
                required
              />
              <Input
                label="Description"
                name="description"
                value={teamForm.description}
                onChange={(event) =>
                  setTeamForm((prev) => ({ ...prev, description: event.target.value }))
                }
              />
              <div className="team-form-modal__actions">
                <Button type="button" variant="ghost" onClick={closeModal}>
                  Cancel
                </Button>
                <Button type="submit">Create Team</Button>
              </div>
            </form>
          </div>
        </div>
      )}
      {modal === 'member' && (
        <div className="team-template__modal">
          <div className="team-template__modal-card">
            <form onSubmit={handleAddMember} className="team-form-modal">
              <h3>Add Member</h3>
              <Select
                label="Team"
                name="teamId"
                value={memberForm.teamId}
                onChange={(event) =>
                  setMemberForm((prev) => ({ ...prev, teamId: event.target.value }))
                }
                options={teams.map((team) => ({ label: team.name, value: team.id }))}
              />
              <Input
                label="Name"
                name="name"
                value={memberForm.name}
                onChange={(event) => setMemberForm((prev) => ({ ...prev, name: event.target.value }))}
                required
              />
              <Select
                label="Role"
                name="role"
                value={memberForm.role}
                onChange={(event) => setMemberForm((prev) => ({ ...prev, role: event.target.value }))}
                options={ROLES.map((role) => ({ label: role, value: role }))}
              />
              <Input
                label="Capacity"
                name="capacity"
                type="number"
                min="0"
                max="5"
                value={memberForm.capacity}
                onChange={(event) =>
                  setMemberForm((prev) => ({ ...prev, capacity: event.target.value }))
                }
              />
              <div className="team-form-modal__actions">
                <Button type="button" variant="ghost" onClick={closeModal}>
                  Cancel
                </Button>
                <Button type="submit">Add Member</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </TeamTemplate>
  );
};

