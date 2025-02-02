// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
		interface Locals {
			user: {
				id: number;
				email: string;
				username: string;
				iat: number;
				exp: number;
				status: number;
			} | null;
		}
	}
}

export {};
