<script context="module">
	export const ssr = false;
	export const prerender = false;
</script>

<script lang="typescript">
	// import { pulldown_cmark, greet } from '../../markdown_wasm/pkg/markdown_wasm';
	import init from '../../markdown_wasm/pkg/markdown_wasm_bg.wasm';

	// let wasmContainer: { pulldown_cmark: typeof pulldown_cmark, greet: typeof greet };
	// import('../../markdown_wasm/pkg').then((wasm) => (wasmContainer = wasm));

	let text = '';
	const handleTextChange = async () => {
		// console.log(wasmContainer?.pulldown_cmark);
		// console.log(wasmContainer?.pulldown_cmark(text))
		// wasmContainer.greet();
		init().then((exports) => exports.greet());
	};
</script>

<svelte:head>
	<title>Markdown</title>
</svelte:head>

<div class="content">
	<textarea on:change={handleTextChange} bind:value={text} />
</div>

<style>
	.content {
		width: 100%;
		max-width: var(--column-width);
		margin: var(--column-margin-top) auto 0 auto;
	}
</style>
