import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import path from 'path';
import examples from 'mdsvexamples/vite';
import pkg from './package.json' assert { type: 'json' };

export default defineConfig({
	plugins: [sveltekit(), examples],
	resolve: {
		alias: {
      'sveaflet-markercluster': path.resolve(process.cwd(), './src/lib/index.ts')
    }
	},
	define: {
		__VERSION__: `"${pkg.version}"`,
	},
});
