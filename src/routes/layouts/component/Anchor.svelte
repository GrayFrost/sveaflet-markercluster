<script lang="ts" module>
  // import type { LinkType } from '$lib/types';

  export function extract(x: HTMLElement): any { // todo type
    if (x.firstElementChild) return { rel: x.tagName, href: '#' + x.firstElementChild?.id, name: x?.firstChild?.nodeValue ?? '' };
    return { name: '' };
  }
</script>

<script lang="ts">
  // import { twMerge } from 'tailwind-merge';

  interface Props {
    tag: string;
    children?: import('svelte').Snippet;
    [key: string]: any
  }

  let { ...props }: Props = $props();

  let content: string | undefined = $state();
	let slug: string | undefined = $state();

  function init(node: HTMLElement) {
    content = node.firstChild?.nodeValue ?? '';
    slug = content.replace(/\s/g, '_');
  }

  // $: elemClass = twMerge('relative group', $$props.class);
</script>

<svelte:element this={props.tag} {...props} use:init>
  {@render props.children?.()}
  <span id={slug} class="absolute -top-[140px]"></span>
  <a class="ms-2 text-primary-700 opacity-0 transition-opacity dark:text-primary-700 group-hover:opacity-100" href="#{slug}" aria-label="Link to this section: {content}"> # </a>
</svelte:element>
