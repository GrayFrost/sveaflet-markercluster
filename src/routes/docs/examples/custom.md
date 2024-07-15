---
layout: componentLayout
breadcrumb_title: custom
title: Custom
component_title: Custom
dir: examples
description: Marker Clustering Custom
---

```svelte example csr
<script>
  import { tick } from 'svelte';
	import { Map, TileLayer, Marker, Popup, Polygon} from 'sveaflet';
	import { latLng, divIcon, point } from 'leaflet';
	import { MarkerCluster } from 'sveaflet-markercluster';
	import { addressPoints } from '../assets/realword.388.js';

  const arr = Array.from({length: 100}).map((_, i) => i);

  let map;
  let markerCluster;
  let shownLayer;
  let polygonLatLngs;

  function getRandomLatLng(map) {
    const bounds = map.getBounds();
    const southWest = bounds.getSouthWest();
    const northEast = bounds.getNorthEast();
    const lngSpan = northEast.lng - southWest.lng;
    const latSpan = northEast.lat - southWest.lat;
    return latLng(
      southWest.lat + latSpan * Math.random(),
      southWest.lng + lngSpan * Math.random()
    );
  }

  function removePolygon() {
    if (shownLayer) {
      shownLayer.setOpacity(1);
      shownLayer = null;
    }
    if (polygonLatLngs) {
      polygonLatLngs = null;
    }
  }

  $: if (map) {
    if (markerCluster) {
      markerCluster.on('clustermouseover', function(a) {
        removePolygon();
        a.layer.setOpacity(0.2);
        shownLayer = a.layer;
        polygonLatLngs = a.layer.getConvexHull();
      });
      markerCluster.on('clustermouseout', removePolygon);
      map.on('zoomend', removePolygon);
    }
  }
</script>

<div style="width:100%;height:500px;">
	<Map options={{ center: [50.5, 30.51], zoom: 15 }} bind:instance={map}>
    <TileLayer
			url={'https://tile.openstreetmap.org/{z}/{x}/{y}.png'}
			options={{
				maxZoom: 18,
				attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
			}}
		/>
    <MarkerCluster
      bind:instance={markerCluster}
      options={{
        maxClusterRadius: 120,
        spiderfyOnMaxZoom: false,
        showCoverageOnHover: false,
        zoomToBoundsOnClick: false,
        iconCreateFunction: function (cluster) {
          const markers = cluster.getAllChildMarkers();
          let n = 0;
          for (let i = 0; i < markers.length; i++) {
            n += markers[i].options.title;
          }
          return divIcon({ html: n, className: 'mycluster', iconSize: point(40, 40) })
        }
      }}
    >
      {#each arr as i}
        <Marker latLng={getRandomLatLng(map)} options={{
          title: i
        }} />
      {/each}
      {#if polygonLatLngs}
        <Polygon latLngs={polygonLatLngs} />
      {/if}
    </MarkerCluster>
  </Map>
</div>

<style>
  :global(.mycluster) {
    width: 40px;
    height: 40px;
    background-color: greenyellow;
    text-align: center;
    font-size: 24px;
  }
</style>
```
