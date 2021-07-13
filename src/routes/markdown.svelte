<script context="module">
	// export const ssr = false;
	// export const prerender = false;
</script>

<script lang="typescript">
	import { onMount } from 'svelte';
	let text = '';
	let html = '';
	let init
	let pulldown_cmark
	
	onMount(async () => {
		const i = await import('../../markdown_wasm/pkg/markdown_wasm')
		init = i.default
		pulldown_cmark = i.pulldown_cmark
	})
		
	const handleTextChange = async () => {
		if (!init) return
		await init();
		html = pulldown_cmark(text);
	};
</script>

<svelte:head>
	<title>Markdown</title>
</svelte:head>

<div class="content">
	<textarea on:keydown={handleTextChange} bind:value={text} />
	{@html html}
</div>

<style>
	.content {
		width: 100%;
		max-width: var(--column-width);
		margin: var(--column-margin-top) auto 0 auto;
	}
	textarea {
		width: 100%;
		min-height: 100px;
	}
</style>
