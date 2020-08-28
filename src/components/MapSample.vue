<template>
  <div class="map-container">
    <div id="map"></div>
  </div>
</template>

<script>
import mapboxgl from "mapbox-gl";
import _env from "../config/env";
export default {
  name: "MapSample",
  data() {
    return {
      map: null
    };
  },
  mounted() {
    this.createMap();
  },
  methods: {
    createMap() {
      // mapboxgl.accessToken = _env.mapboxAccessToken;
      let map = new mapboxgl.Map({
        accessToken: _env.mapboxAccessToken,
        container: "map",
        style: {
          version: 8,
          sources: {
            cyberjapandata_std: {
              type: "raster",
              tiles: [
                "https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png"
              ],
              tileSize: 256,
              attribution:
                "Maptiles by <a href='http://mierune.co.jp/' target='_blank'>MIERUNE</a>, under CC BY. Data by <a href='http://osm.org/copyright' target='_blank'>OpenStreetMap</a> contributors, under ODbL."
            },
            cyberjapandata_pale: {
              type: "raster",
              tiles: [
                "https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png"
              ],
              tileSize: 256
            }
          },
          layers: [
            {
              id: "cyberjapandata_pale_layer",
              type: "raster",
              source: "cyberjapandata_pale",
              minzoom: 0,
              maxzoom: 18
            },
            {
              id: "cyberjapandata_std_layer",
              type: "raster",
              source: "cyberjapandata_std",
              minzoom: 0,
              maxzoom: 18,
              layout: {
                visibility: "none"
              }
            }
          ]
        },
        center: [132.45944, 34.39639],
        zoom: 11
      });

      map.addControl(new mapboxgl.NavigationControl());
      this.map = map;
    }
  }
};
</script>
<style scoped>
#map {
  z-index: 100;
  width: 100%;
  height: 100%;
}
</style>
