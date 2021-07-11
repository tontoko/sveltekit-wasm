import preprocess from 'svelte-preprocess';
import { ViteRsw } from 'vite-plugin-rsw';
// import rust_rollup from '@wasm-tool/rollup-plugin-rust';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		vite: {
			plugins: [
				ViteRsw({
					crates: [
						// '@rsw/hey',
						// 'rsw-test',
						// https://github.com/lencx/vite-plugin-rsw/issues/8#issuecomment-820281861
						// outDir: use `path.resolve` or relative path.
						{ name: 'markdown-wasm', outDir: './pkg' }
					]
				})
			]
			// build: {
			// 	rollupOptions: {
			// 		plugins: [
			// 			rust_rollup({
			// 				verbose: true,
			// 				serverPath: '/pkg/',
			// 				inlineWasm: true
			// 			})
			// 		]
			// 	}
			// }
		}
	}
};

export default config;
