import { create } from 'zustand';

const useUserStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),

  member: [], 
  setMember: (members) => set({ member: members }), 
  clearMember: () => set({ member: [] }),
}));

export default useUserStore;
