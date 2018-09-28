<template>
  <GmapMap class="mapDesign"
  :center="{lat:40.3461017, lng:-94.87247059999999}"
  :zoom="13"
  map-type-id="roadmap"
  style="width: 800px; height: 450px; margin-top: 20px;"
>
  <GmapMarker
    :key="index"
    v-for="(m, index) in markers"
    :position="m.position"
    :clickable="true"
    :draggable="true"
    @click="center=m.position"
  />
</GmapMap>
</template>
<script>
export default {
  name: 'googlemaps',
  data () {
    return {
      markers: [
        {
          position: { lat: 40.35024, lng: -94.88756419999999 }
        }
      ]
    }
  }
}
</script>
<style scoped>
.mapDesign
{
  border-style: solid;
  border-width: 5px;
}
</style>
