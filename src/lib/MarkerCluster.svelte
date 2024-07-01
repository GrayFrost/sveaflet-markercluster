<script lang="ts">
  import { onMount, onDestroy, getContext, setContext } from "svelte";
  import 'leaflet.markercluster';
  import { Map, MarkerClusterGroup } from "leaflet";
  import type { LeafletContextInterface } from 'sveaflet';
  import 'leaflet.markercluster/dist/MarkerCluster.css';
  import 'leaflet.markercluster/dist/MarkerCluster.Default.css';

  let parentContext = getContext<LeafletContextInterface>(Map);
  const { getMap } = parentContext;

  let markerCluster: MarkerClusterGroup | undefined;
  let ready = false;

  $: map = getMap();

  onMount(() => {
    markerCluster = new MarkerClusterGroup();
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

  setContext(
    Map,
    Object.freeze({ ...parentContext, getLayer: () => markerCluster })
  );
</script>

{#if ready}
  <slot />
{/if}
