import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

import _env from "../config/env";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cityCode: "1f9352af60b0366b589326faf49a2343",
    year: 2000,
    selectedLayer: 1,
    selectedDataType: 1,
    map: null,
    numData: null
  },
  mutations: {
    setMap(state, map) {
      state.map = map;
    },
    setNumData(state, numData) {
      state.numData = numData;
    }
  },
  actions: {
    async fetchNumData(context) {
      const cityCode = context.state.cityCode;
      const selectedLayer = context.state.selectedLayer;
      const selectedDataType = context.state.selectedDataType;
      const year = context.state.year;
      const mapBounds = context.state.map.getBounds();
      let newBounds = {};
      newBounds["_southWest"] = mapBounds["_sw"];
      newBounds["_northEast"] = mapBounds["_ne"];
      await axios
        .get(`${_env.demoAPI}/numData`, {
          params: {
            cityCode: cityCode,
            year: year,
            selectedLayer: selectedLayer,
            selectedDataType: selectedDataType,
            mapBounds: newBounds
          }
        })
        .then(res => {
          console.log(res.data);
          if (Object.keys(res.data).length > 0) {
            context.commit("setNumData", res.data);
          }
        });
    }
  },
  modules: {}
});
