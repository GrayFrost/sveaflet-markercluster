<script context="module">
	import h2 from './h2.svelte';
	import h3 from './h3.svelte';
	import table from './table.svelte';
	import thead from './thead.svelte';
	import th from './th.svelte';
	import td from './td.svelte';
	import a from './a.svelte';
	import code from './code.svelte';

	export { h2, h3, table, thead, th, td, a, code };
</script>

<script>

	// import MetaTag from '../../utils/MetaTag.svelte';
	import Toc from '../../utils/Toc.svelte';
	import PageHeadSection from '../../utils/PageHeadSection.svelte';
	// import Paging from '../../utils/Paging.svelte';
	import { extract } from './Anchor.svelte';

	/**
	 * @typedef {Object} Props
	 * @property {any} title
	 * @property {any} breadcrumb_title
	 * @property {string} [component_title]
	 * @property {any} dir
	 * @property {any} description
	 * @property {string} [layout]
	 * @property {import('svelte').Snippet} [children]
	 */

	 /** @type {Props} */
	 let {
		title,
		breadcrumb_title,
		component_title = '',
		dir,
		description,
		layout = '',
		children
	} = $props();

	// calm down `unused export property` warrning
	layout;
	breadcrumb_title;
	component_title;
</script>

<!-- <MetaTag {breadcrumb_title} {title} {dir} {description} /> -->

<div class="flex w-full">
	<div
		class="flex flex-col max-w-4xl mx-auto px-4 min-w-0 pt-6 lg:px-8 lg:pt-8 pb:12 xl:pb-24 lg:pb-16 divide-y divide-gray-200 dark:divide-gray-800"
	>
		<PageHeadSection {dir} {title} {description} />
		<div id="mainContent" class="py-8">
			{@render children?.()}
			<!-- <Paging /> -->
		</div>
		<!-- <Footer /> -->
	</div>

	<Toc {extract} headingSelector="#mainContent > :where(h2, h3)" />
</div>
