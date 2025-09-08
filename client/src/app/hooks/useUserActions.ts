import { useCallback } from 'react';
import { useUserStore } from '../store/userStore';

export function useUserActions() {
  const { fetchUsers, fetchUserById } = useUserStore();

  return {
    fetchUsers: useCallback(fetchUsers, [fetchUsers]),
    fetchUserById: useCallback(fetchUserById, [fetchUserById]),
  };
}