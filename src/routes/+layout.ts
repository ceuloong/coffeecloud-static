import type { LayoutLoad } from './$types';
import { userStore } from '$lib/stores/userStore';

export const load: LayoutLoad = async ({ data }) => {
  if (data.user) {
    userStore.login({
      id: data.user.id,
      email: data.user.email,
      username: data.user.username,
      isLoggedIn: true
    });
  }

  return {
    user: data.user
  };
}; 