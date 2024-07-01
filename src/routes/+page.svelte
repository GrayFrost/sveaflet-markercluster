<script lang="ts">
  // import { MetaTags } from 'svelte-meta-tags';
  import { Button } from "flowbite-svelte";
  import { ArrowRightOutline } from "flowbite-svelte-icons";
  import { latLng } from "leaflet";
  import type { Marker as MarkerType } from "leaflet";
  import { Map, TileLayer, Marker, Popup } from "sveaflet";
  // import Footer from './utils/Footer.svelte';
  import MarkerCluster from "$lib/MarkerCluster.svelte";
  import { addressPoints } from "../routes/docs/assets/realword.388";

  let logo = "/images/sveaflet.png";
  let marker: MarkerType;

  $: if (marker) {
    marker.openPopup();
  }

  let title = "Sveaflet-MarkerCluster - A plugin of Sveaflet";
  let description =
    "Sveaflet is an open-source Map component library built with Svelte components and Leaflet that can help you build your map page faster.";
</script>

<!-- <MetaTags
	{title}
	{description}
	openGraph={{
		type: 'website',
		url: `https://sveaflet.vercel.app/`,
		title: `${title}`,
		description: `${description}`,
		siteName: 'Sveaflet'
	}}
/> -->

<main class="flex-auto min-w-0 lg:static lg:max-h-full lg:overflow-visible">
  <!-- <div class="flex justify-center items-center mx-auto my-8 relative w-[240px] h-[200px]">
		<img src={logo} alt="logo" class="w-full h-full" />
	</div> -->
  <p
    class="flex justify-center my-8 text-lg lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400"
  >
    Sveaflet-MarkerCluster - A plugin of Sveaflet
  </p>

  <div class="flex justify-center my-8">
    <Button href="/docs/pages/introduction"
      >Get Started<ArrowRightOutline class="w-6 h-6 ms-2" /></Button
    >
  </div>

  <div
    class="h-[600px] px-4 lg:h-[600px] lg:px-20 md:h-[320px] md:px-10 my-8 mx-auto max-w-[90rem] py-8"
  >
    <Map options={{ center: [-37.82, 175.24], zoom: 13 }}>
      <TileLayer
        url={"https://tile.openstreetmap.org/{z}/{x}/{y}.png"}
        options={{
          maxZoom: 18,
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Points &copy 2012 LINZ',
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
  <!-- <Footer /> -->
</main>
