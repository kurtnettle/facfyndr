import { enhancedImages } from '@sveltejs/enhanced-img';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	build: {
		target: 'es2020'
	},
	plugins: [enhancedImages(), sveltekit(), tailwindcss()]
});
