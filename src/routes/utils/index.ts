import type Mdsvex from '*.md';

const basename = (path: string) => path.split('/').pop()?.split('.').shift() ?? '';
const filePath = (path: string) => '/' + basename(path);
const sortByList = (order: string[]) => (a: [string, any], b: [string, any]) =>
	[a[0], b[0]]
		.map((x) => order.indexOf(basename(x)))
		.reduce((x, y) => (x < 0 ? 1 : y < 0 ? -1 : x - y));

export const fetchMarkdownPosts = async () => {
	const pageFiles = import.meta.glob<Mdsvex>('/src/routes/docs/pages/*.md');
	const exampleFiles = import.meta.glob<Mdsvex>('/src/routes/docs/examples/*.md');

	const iterablePageFiles = Object.entries(pageFiles);
	const iterableExampleFiles = Object.entries(exampleFiles);
	
	const allPages = await Promise.all(
		iterablePageFiles.map(async ([path, resolver]) => {
			const { metadata } = await resolver();
			return {
				meta: metadata,
				path: filePath(path)
			};
		})
	);

	const allExamples = await Promise.all(
		iterableExampleFiles.map(async ([path, resolver]) => {
			const { metadata } = await resolver();
			return {
				meta: metadata,
				path: filePath(path)
			};
		})
	);

	return {
		pages: allPages,
		examples: allExamples
	};
};
