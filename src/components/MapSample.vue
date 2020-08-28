<template>
  <div class="map-container">
    <div id="map"></div>
  </div>
</template>

<script>
import mapboxgl from "mapbox-gl"; // pure map box gl library
import _env from "../config/env";

export default {
  name: "MapSample",
  components: {},
  data() {
    return {
      map: null
    };
  },
  mounted() {
    Promise.all([this.createMap()]).then(() => {
      const numData = this.$store.state.numData;
      let expressionList = ["case"];
      for (let [key, value] of Object.entries(numData)) {
        let color = this.getThresholdColor(value);
        expressionList.push(["==", ["get", "GRID_CODE"], key]);
        expressionList.push(color);
      }
      expressionList.push("rgba(0,0,0,0)");
      this.setMeshColor(expressionList);
    });
  },
  methods: {
    setMeshColor(expArray) {
      let map = this.$store.state.map;
      map.setPaintProperty("500m_mesh_layer", "fill-color", expArray);
      this.$store.commit("setMap", map);
    },
    getThresholdColor(value) {
      const thresholds = _env.THRESHOLD2048;
      let color = "";
      for (let [key, colorValue] of Object.entries(thresholds)) {
        if (Number(key) > value) {
          break;
        } else {
          color = colorValue;
        }
      }
      return color;
    },
    async createMap() {
      let map = new mapboxgl.Map({
        accessToken: _env.mapboxAccessToken, // set access token
        container: "map", // point map container by element id
        style: {
          version: 8,
          sources: {
            cyberjapandata_std: {
              type: "raster",
              tiles: [
                "https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png"
              ],
              tileSize: 256
            },
            cyberjapandata_pale: {
              type: "raster",
              tiles: [
                "https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png"
              ],
              tileSize: 256
            },
            "500m_mesh_source": {
              type: "vector",
              tiles: [
                "https://demo-sip7map.datacradle.jp/tile/data/japan_500m_mesh/{z}/{x}/{y}.pbf"
              ]
            }
          },
          layers: [
            {
              id: "cyberjapandata_std_layer", // 固有のid
              type: "raster",
              source: "cyberjapandata_std", // sourcesの対応するkey
              minzoom: 0,
              maxzoom: 18
            },
            {
              id: "cyberjapandata_pale_layer", // 固有のid
              type: "raster",
              source: "cyberjapandata_pale", // sourcesの対応するkey
              minzoom: 0,
              maxzoom: 18
            },
            {
              id: "500m_mesh_layer",
              type: "fill",
              source: "500m_mesh_source",
              "source-layer": "japan_500m_mesh",
              paint: {
                "fill-color": "rgba(0,0,0,0)",
                "fill-outline-color": "rgba(0,0,0,0)"
              }
            }
          ]
        },
        center: [132.45944, 34.39639],
        zoom: 11
      });

      map.addControl(new mapboxgl.NavigationControl());
      this.$store.commit("setMap", map);
      await this.$store.dispatch("fetchNumData");
    }
  }
};
</script>

<style>
#map {
  z-index: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  margin: 0;
}
</style>
