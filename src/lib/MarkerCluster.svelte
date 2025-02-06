<script lang="ts">
  import { onMount, onDestroy, getContext, setContext, type Snippet } from "svelte";
  import "leaflet.markercluster";
  import { Map, marker, MarkerClusterGroup } from "leaflet";
  import type { MarkerClusterGroupOptions } from "leaflet";
  import type { LeafletContextInterface } from "sveaflet";
  import "leaflet.markercluster/dist/MarkerCluster.css";
  import "leaflet.markercluster/dist/MarkerCluster.Default.css";
  import { EventBridge } from "sveaflet";

  // props
  type Props = {
    options: MarkerClusterGroupOptions;
    instance?: MarkerClusterGroup;
    children?: Snippet;
  } & { [key: string]: unknown };

  let {
    options = {},
    instance = $bindable(),
    children,
    ...restProps
  }: Props = $props();

  // context
  let parentContext = getContext<LeafletContextInterface>(Map);
  const { getMap } = parentContext;

  // data
  let ready = $state(false);
  let markerCluster: MarkerClusterGroup | undefined = $state();
  let eventBridge: EventBridge<MarkerClusterGroup> | undefined;

  let map: Map | undefined = $derived(getMap?.());

  $effect(() => {
    instance = markerCluster;
  })

  onMount(() => {
    markerCluster = new MarkerClusterGroup(options);
    eventBridge = new EventBridge(markerCluster);
    eventBridge.addEvents(restProps)
    ready = true;
  });

  $effect(() => {
    if (map) {
      if (markerCluster) {
        map.addLayer(markerCluster);
      }
    }
  });

  onDestroy(() => {
    eventBridge?.removeEvents();
    markerCluster?.remove();
    markerCluster = undefined;
  });

  setContext(Map, { ...parentContext, getLayer: () => markerCluster });
</script>

{#if ready}
  {@render children?.()}
{/if}
