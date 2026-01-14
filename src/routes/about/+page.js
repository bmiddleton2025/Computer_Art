export function load() {
	const modules = import.meta.glob('/src/images/*', { eager: true });

	const images = Object.keys(modules).map((path) => {
		const file = path.split('/').pop();
		return {
			src: `src/images/${file}`,
			alt: file
		};
	});

	return { images };
}
