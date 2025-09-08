import { create } from 'zustand';
import { User } from '@acme/shared-models';
import { userService } from '../services/userService';

interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
  
  fetchUsers: () => Promise<void>;
  fetchUserById: (id: number) => Promise<User | null>;
  
  getUserById: (id: number) => User | undefined;
  getUserName: (id: number) => string;
}

export const useUserStore = create<UserState>((set, get) => ({
  users: [],
  loading: false,
  error: null,

  fetchUsers: async () => {
    set({ loading: true, error: null });
    try {
      const response = await userService.getUsers();
      set({ users: response.data ?? [], loading: false });
    } catch (err) {
      const error = err instanceof Error ? err.message : 'Failed to fetch users';
      set({ error, loading: false });
    }
  },

  fetchUserById: async (id: number) => {
    set({ loading: true, error: null });
    try {
      const response = await userService.getUserById(id);
      set(state => {
        const userExists = state.users.some(user => user.id === id);
        if (!userExists && response.data) {
          return { 
            users: [...state.users, response.data],
            loading: false 
          };
        }
        return { loading: false };
      });
      return response.data;
    } catch (err) {
      const error = err instanceof Error ? err.message : 'Failed to fetch user';
      set({ error, loading: false });
      return null;
    }
  },

  getUserById: (id: number) => {
    const { users } = get();
    return users.find(user => user.id === id);
  },

  getUserName: (id: number) => {
    const { users } = get();
    const user = users.find(user => user.id === id);
    return user ? user.name : `User #${id}`;
  },
}));