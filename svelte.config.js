import preprocess from 'svelte-preprocess';
import { ViteRsw } from 'vite-plugin-rsw';
import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: adapter({
			// default options are shown
			// pages: 'build',
			// assets: 'build',
			// fallback: null
			fallback: '200.html'
		}),
		ssr: false,
		prerender: {
			enabled: false
		},
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		vite: {
			input: {
				markdown_wasm: './markdown_wasm/Cargo.toml'
			},
			plugins: [
				ViteRsw({
					crates: [
						// '@rsw/hey',
						// 'rsw-test',
						// https://github.com/lencx/vite-plugin-rsw/issues/8#issuecomment-820281861
						// outDir: use `path.resolve` or relative path.
						{ name: 'markdown_wasm', outDir: './pkg' }
					]
				})
			]
		}
	}
};

export default config;
