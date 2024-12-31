import { writable } from 'svelte/store';
import { browser } from '$app/environment';

interface User {
  id: number;
  username: string;
  email: string;
  isLoggedIn: boolean;
}

function createUserStore() {
  // 从 localStorage 获取初始状态
  const storedUser = browser ? localStorage.getItem('user') : null;
  const initialUser = storedUser ? JSON.parse(storedUser) : null;
  
  const { subscribe, set, update } = writable<User | null>(initialUser);

  return {
    subscribe,
    login: (user: User) => {
      set(user);
      if (browser) {
        localStorage.setItem('user', JSON.stringify(user));
      }
    },
    logout: () => {
      set(null);
      if (browser) {
        localStorage.removeItem('user');
      }
    },
    update: (data: Partial<User>) => {
      update(user => {
        const updatedUser = user ? { ...user, ...data } : null;
        if (browser && updatedUser) {
          localStorage.setItem('user', JSON.stringify(updatedUser));
        }
        return updatedUser;
      });
    }
  };
}

export const userStore = createUserStore(); 