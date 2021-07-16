export const wasm_boot = async (wasmPath: string) => {
	const res = (await import(wasmPath + '_bg.wasm')).default.toString().match(/\(t,"(.*)"\)/);
	console.log(res);

	const url = res ? res[1] : wasmPath + '_bg.wasm';
	const init = (await import(wasmPath)).default;
	const fn = await import(wasmPath);
	const initialized: WebAssembly.Module = await init(url);

	return { initialized, ...fn };
};
