<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <MapSample />
  </div>
</template>

<script>
// @ is an alias to /src
import MapSample from "@/components/MapSample.vue";

export default {
  name: "Home",
  components: {
    MapSample
  }
};
</script>
