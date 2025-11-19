import { useEffect, useState } from 'react';
import { Button, Input, Select } from '../../atoms/index.js';
import { ROLES } from '../../../constants/roles.js';
import './TeamForm.css';

export const TeamForm = ({ onCreateTeam, onAddMember, teams = [] }) => {
  const [teamForm, setTeamForm] = useState({ name: '', description: '' });
  const [memberForm, setMemberForm] = useState({
    teamId: teams[0]?.id || '',
    name: '',
    role: ROLES[0],
    capacity: 3,
  });

  useEffect(() => {
    if (!teams.length) return;
    setMemberForm((prev) => {
      if (prev.teamId && teams.some((team) => team.id === prev.teamId)) {
        return prev;
      }
      return { ...prev, teamId: teams[0].id };
    });
  }, [teams]);

  const handleTeamSubmit = (event) => {
    event.preventDefault();
    onCreateTeam(teamForm);
    setTeamForm({ name: '', description: '' });
  };

  const handleMemberSubmit = (event) => {
    event.preventDefault();
    onAddMember(memberForm.teamId, {
      name: memberForm.name,
      role: memberForm.role,
      capacity: Number(memberForm.capacity),
    });
    setMemberForm((prev) => ({ ...prev, name: '' }));
  };

  return (
    <div className="team-form">
      <form onSubmit={handleTeamSubmit}>
        <h4>Create Team</h4>
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
        <Button type="submit">Create Team</Button>
      </form>

      <form onSubmit={handleMemberSubmit}>
        <h4>Add Member</h4>
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
          onChange={(event) => setMemberForm((prev) => ({ ...prev, capacity: event.target.value }))}
        />
        <Button type="submit">Add Member</Button>
      </form>
    </div>
  );
};

