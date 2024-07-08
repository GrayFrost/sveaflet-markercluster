<script lang="ts">
  import { onMount, onDestroy, getContext, setContext } from "svelte";
  import "leaflet.markercluster";
  import { Map, MarkerClusterGroup } from "leaflet";
  import type { MarkerClusterGroupOptions } from "leaflet";
  import type { LeafletContextInterface } from "sveaflet";
  import "leaflet.markercluster/dist/MarkerCluster.css";
  import "leaflet.markercluster/dist/MarkerCluster.Default.css";

  // props
  export let options: MarkerClusterGroupOptions = {};
  export let instance: MarkerClusterGroup | undefined = undefined;

  // context
  let parentContext = getContext<LeafletContextInterface>(Map);
  const { getMap } = parentContext;

  // data
  let markerCluster: MarkerClusterGroup | undefined;
  let ready = false;

  $: map = getMap();
  $: instance = markerCluster;

  onMount(() => {
    markerCluster = new MarkerClusterGroup(options);
    ready = true;
  });

  $: if (map) {
    if (markerCluster) {
      map.addLayer(markerCluster);
    }
  }

  onDestroy(() => {
    markerCluster?.remove();
    markerCluster = undefined;
  });

  setContext(Map, { ...parentContext, getLayer: () => markerCluster });
</script>

{#if ready}
  <slot />
{/if}
