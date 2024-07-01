---
layout: componentLayout
breadcrumb_title: basic
title: Basic Example
component_title: Basic Example
dir: examples
description: Examples about how to use Sveaflet-MarkerCluster
---

## Default MarkerCluster

```svelte example csr
<script>
	import { Map, TileLayer, Marker, Popup } from 'sveaflet';
	import { latLng } from 'leaflet';
	import { MarkerCluster } from 'sveaflet-markercluster';
	import { addressPoints } from '../assets/realword.388.js';

</script>

<div style="width:100%;height:500px;">
	<Map options={{ center: [-37.82, 175.24], zoom: 13 }}>
		<TileLayer
			url={'https://tile.openstreetmap.org/{z}/{x}/{y}.png'}
			options={{
				maxZoom: 18,
				attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Points &copy 2012 LINZ'
			}}
		/>
		<MarkerCluster>
			{#each addressPoints as a}
				{@const title = String(a[2])}
				<Marker
					latlng={[Number(a[0]), Number(a[1])]}
					options={{
						title,
					}}
				>
					<Popup options={{ content: title }}></Popup>
				</Marker>
			{/each}
		</MarkerCluster>
	</Map>
</div>
```
