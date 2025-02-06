<script lang="ts">
	import {
		DarkMode,
		Navbar,
		NavBrand,
		NavHamburger,
		NavLi,
		NavUl,
		ToolbarButton,
		Tooltip
	} from 'flowbite-svelte';
	import { onMount, setContext } from 'svelte';
	import { writable, type Writable } from 'svelte/store';
	import GitHub from './utils/icons/GitHub.svelte';
	import DocBadge from './utils/DocBadge.svelte';
	import { navigating, page } from '$app/state';

	import '../app.css';

	interface Props {
		children?: Snippet;
	}

	let { children }: Props = $props();

	let isHomePage: boolean = $derived(page.route.id === '/');
	const version = __VERSION__;
	let activeUrl = $derived(page.url.pathname);
	let divClass = 'w-full ms-auto lg:block lg:w-auto order-1 lg:order-none';
	let ulClass =
		'flex flex-col py-3 my-4 lg:flex-row lg:my-0 text-sm font-medium text-gray-900 dark:text-gray-300 gap-4';

		const drawerHiddenStore: Writable<boolean> = writable<boolean>(true);
	setContext('drawer', drawerHiddenStore);

	const toggleDrawer = () => {
		drawerHiddenStore.update((state) => !state);
	};
</script>

<header
	class="sticky top-0 z-1002 flex-none w-full mx-auto bg-white border-b border-gray-200 dark:border-gray-600 dark:bg-gray-800"
>
	<Navbar
		color="default"
		fluid
		class="h-15 py-0 flex items-center {isHomePage ? 'lg:px-0 max-w-7xl mx-auto' : ''}"
		let:toggle
	>
		<span hidden={page.route.id === '/'}>
			<NavHamburger onClick={toggleDrawer} class="m-0 me-3 md:block lg:hidden" />
		</span>
		<NavBrand href="/" class="relative">
			<span
				class="self-center whitespace-nowrap text-2xl font-semibold dark:text-white sveaflet-text"
			>
				Sveaflet-MarkerCluster
			</span>
			<div class="dark:sveaflet-bg"></div>
		</NavBrand>
		<NavUl
			{divClass}
			{ulClass}
			{activeUrl}
			on:click={() => setTimeout(toggle, 1)}
			nonActiveClass="md:!ps-3 md:!py-2 lg:!ps-0 text-gray-700 hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 dark:text-gray-400 lg:dark:text-white lg:dark:hover:text-primary-700 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"
			activeClass="md:!ps-3 md:!py-2 lg:!ps-0 text-white bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:dark:text-primary-700 dark:bg-primary-600 lg:dark:bg-transparent cursor-default"
		>
			<NavLi class="lg:px-2 lg:mb-0" href="/">Home</NavLi>
			<NavLi class="lg:px-2 lg:mb-0" href="/docs/pages/introduction">Docs</NavLi>
			<NavLi class="lg:px-2 lg:mb-0" href="/docs/examples/basic"
				>Examples</NavLi
			>
		</NavUl>
		<div class="flex items-center ms-auto">
			<ToolbarButton
				class="hidden sm:inline-block dark:hover:text-white hover:text-gray-900 focus:ring-0"
				name="View on GitHub"
				target="_blank"
				rel="noreferrer"
				size="lg"
				href="https://github.com/GrayFrost/sveaflet-markercluster"
			>
				<GitHub />
			</ToolbarButton>
			<DarkMode size="lg" class="inline-block dark:hover:text-white hover:text-gray-900" />
		</div>

		<a href="https://www.npmjs.com/package/sveaflet-markercluster" class="hidden sm:block">
			<DocBadge
				large
				class="ms-2 xl:ms-6 hover:bg-primary-600 hover:text-white dark:hover:bg-primary-800 dark:hover:text-white"
			>
				v{version}
			</DocBadge>
		</a>

		<NavHamburger
			on:click={toggle}
			class="ms-3 m-0 md:block lg:hidden {isHomePage ? '' : 'hidden'}"
		/>
	</Navbar>
</header>

<div class="lg:flex">
	<slot />
</div>
