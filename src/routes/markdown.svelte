<script context="module">
	export const ssr = false;
	export const prerender = false;
</script>

<script lang="typescript">
	import init, { pulldown_cmark, greet } from '../../markdown_wasm/pkg/markdown_wasm';

	let text = '';
	const handleTextChange = async () => {
		await init();
		greet();
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
