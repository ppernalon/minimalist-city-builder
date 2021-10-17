<template>
  <img class="imageBuilding"
       :src="getBuildingImageSource(this.buildingName)"
       alt="Building">
  <span class="buildingNumber">
    <div class="number"> {{this.numberAvailable}} </div>
  </span>
</template>

<script>
import mapConstants from "../Map/MapConstants";

export default {
  name: "InGameButton.vue",
  props: {
    buildingName: String,
    numberAvailable : Int8Array,
  },
  methods:{
    getBuildingImageSource(buildingType){
      return mapConstants.SRC_BUILDINGS[buildingType]
    }
  },
}

</script>

<style scoped>
.imageBuilding{
  height: 100px;
  margin: 15px
}
.buildingNumber{
  background: #008CFF;
  border-radius: 50%;
  color: white;
  width: 40px;
  height: 40px;
  position: relative;
  left: -40px;
}

.number{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  width: fit-content;
}
</style>