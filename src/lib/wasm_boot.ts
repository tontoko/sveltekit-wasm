export const wasm_boot = async (wasmPath: string) => {
	const init = (await import(wasmPath + '.js')).default;
	const fn = await import(wasmPath + '.js');
	const initialized: WebAssembly.Module = await init(wasmPath + '_bg.wasm');

	return { initialized, ...fn };
};
