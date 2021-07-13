<script context="module">
	// export const ssr = false;
	// export const prerender = false;
</script>

<script lang="typescript">
	import { writable, derived } from 'svelte/store';
	import type { Writable, Readable } from 'svelte/store';
	import { onMount } from 'svelte';
	let wasmInit
	let add_emboss_to_image
	
	onMount(async () => {
		const i = await import('../../markdown_wasm/pkg/markdown_wasm')
		wasmInit = i.default
		add_emboss_to_image = i.add_emboss_to_image
	})
	
	let files: Writable<FileList> = writable();
	let canvas: HTMLCanvasElement = null;
	let canvasRes: HTMLCanvasElement = null;
	
		
	let handleImg: Readable<string> = derived(files, (files, set) => {
		if (!files || !files[0]) return
		const run = async () => {
			const file: string = await new Promise((resolve, reject) => {
				const reader = new FileReader();
				reader.readAsDataURL(files?.[0]);
				reader.onload = () => resolve(reader.result as string);
				reader.onerror = error => reject(error);
			})
			const ctx = canvas.getContext('2d')
			let img = new Image()
			img.src = file
			img.onload = async () => {
				const width = img.width;
        const height = img.height;
        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);
				await wasmInit()
				const res = add_emboss_to_image(canvas, ctx)
				set(res)
			}
		}
		run()
		
		return () => {
			set = () => {}
		}
	})

	handleImg.subscribe(v => {
		if (!v) return
		const ctx = canvasRes.getContext('2d')
			let img = new Image()
			img.src = v
			img.onload = () => {
				const width = img.width;
        const height = img.height;
        canvasRes.width = width;
        canvasRes.height = height;
        ctx.drawImage(img, 0, 0,width,height);
			}
	})

</script>

<svelte:head>
	<title>emboss to image</title>
</svelte:head>

<div class="content">
	<input type="file" accept="jpg,png" bind:files={$files} />
	<div>
		<p>before</p>
		<canvas bind:this={canvas} />
		<p>after</p>
		<canvas bind:this={canvasRes} />
	</div>
</div>

<style>
	.content {
		width: 100%;
		max-width: var(--column-width);
		margin: var(--column-margin-top) auto 0 auto;
	}
	canvas {
		width: 100%;
	}
</style>
