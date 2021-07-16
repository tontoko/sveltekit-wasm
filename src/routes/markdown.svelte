<script context="module">
	// export const ssr = false;
	// export const prerender = false;
</script>

<script lang="typescript">
import { wasm_boot } from '$lib/wasm_boot';

	import { onMount } from 'svelte';
	let text = '';
	let html = '';
	// let init
	let pulldown_cmark
	
	onMount(async () => {
		// const i = await import('../../markdown_wasm/pkg/markdown_wasm')
		// init = i.default
		// pulldown_cmark = i.pulldown_cmark
		const {pulldown_cmark: _pulldown_cmark} = await wasm_boot('../../markdown_wasm/pkg/markdown_wasm')
		pulldown_cmark = _pulldown_cmark
	})

	const handleTextChange = (_text: string) => {
		// if (!init) return
		if (!pulldown_cmark) return
		// await init();
		html = pulldown_cmark(_text);
	}
		
	$: {
		handleTextChange(text)
	};
</script>

<svelte:head>
	<title>Markdown</title>
</svelte:head>

<div class="content">
	<a href="/embossToImage">goto embossToImage</a>
	<textarea bind:value={text} />
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
