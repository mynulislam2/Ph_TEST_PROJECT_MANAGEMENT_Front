import { useEffect } from 'react';
import { useTeamStore } from '../store/team.store.js';

export const useTeams = () => {
  const teams = useTeamStore((state) => state.teams);
  const membersByTeam = useTeamStore((state) => state.membersByTeam);
  const loading = useTeamStore((state) => state.loading);
  const fetchTeams = useTeamStore((state) => state.fetchTeams);
  const fetchMembers = useTeamStore((state) => state.fetchMembers);
  const addMember = useTeamStore((state) => state.addMember);
  const createTeam = useTeamStore((state) => state.createTeam);

  useEffect(() => {
    fetchTeams();
  }, [fetchTeams]);

  useEffect(() => {
    teams.forEach((team) => {
      fetchMembers(team.id);
    });
  }, [teams, fetchMembers]);

  return { teams, membersByTeam, loading, fetchMembers, addMember, createTeam };
};

