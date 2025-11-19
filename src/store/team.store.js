import { create } from 'zustand';
import { TeamService } from '../services/team.service.js';

export const useTeamStore = create((set, get) => ({
  teams: [],
  membersByTeam: {},
  loading: false,
  async fetchTeams() {
    set({ loading: true });
    const { data } = await TeamService.list();
    set({ teams: data, loading: false });
    return data;
  },
  async createTeam(payload) {
    const { data } = await TeamService.create(payload);
    set({ teams: [data, ...get().teams] });
    return data;
  },
  async fetchMembers(teamId) {
    if (!teamId) return [];
    const { data } = await TeamService.listMembers(teamId);
    set((state) => ({
      membersByTeam: { ...state.membersByTeam, [teamId]: data },
    }));
    return data;
  },
  async addMember(teamId, payload) {
    const { data } = await TeamService.addMember(teamId, payload);
    set((state) => ({
      membersByTeam: {
        ...state.membersByTeam,
        [teamId]: [data, ...(state.membersByTeam[teamId] || [])],
      },
    }));
    return data;
  },
}));

