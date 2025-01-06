import { writable } from 'svelte/store';
import type { User } from '$lib/types';
import { browser } from '$app/environment';

function createUserStore() {
  const { subscribe, set } = writable<User | null>(null);

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
    init: () => {
      if (browser) {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
          set(JSON.parse(savedUser));
        }
      }
    }
  };
}

export const userStore = createUserStore(); 