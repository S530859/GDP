<template>
<div class="row">
  <div class="col">
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
  </div>
  <div class="col">
    <div class="mt-5 mx-5 card">
  <div class="card-header">
     <h5 class="card-title">Address</h5>
  </div>
  <div class="card-body">
      <p class="card-text text-left">Ron Houston Center for the Performing Arts
                        <br>College Park Dr,
                        <br>Maryville,
                        <br>MO 64468</p>
  </div>
</div>
  </div>
</div>
  
</template>
<script>
export default {
  name: "googlemaps",
  data() {
    return {
      markers: [
        {
          position: { lat: 40.35024, lng: -94.88756419999999 }
        }
      ]
    };
  }
};
</script>
<style scoped>
.mapDesign {
  border-style: solid;
  border-width: 5px;
}
</style>
