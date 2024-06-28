<script>
  import { onMount, onDestroy, getContext, setContext } from "svelte";
  import { Map } from "leaflet";
  import { MarkerClusterGroup } from "leaflet.markercluster";

  let markerCluster;

  let parentContext = getContext(Map);
  const { getMap } = parentContext;
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
