// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		interface Platform {
			env: Env;
			cf: CfProperties;
			ctx: ExecutionContext;
		}
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

	// Extend the Window interface to include the `HarukazeAndroid` property
	interface Window {
		HarukazeAndroid: {
			isAppDarkMode: () => boolean;
			downloadVCard: (fileName: string, content: string) => void;
		};
	}
}

export {};
