<template>
  <button class="containerButton" @click="onClick" >
      <img class="imageBuilding"
           :src="getBuildingImageSource(this.buildingName)"
           alt="Building">
      <div class="buildingNumber">
      <div class="number"> {{this.numberAvailable}} </div>
  </div>
  </button>
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
    data(){
      return({
        buildingSelected:""
      })
    },
    getBuildingImageSource(buildingType){
      return mapConstants.SRC_BUILDINGS[buildingType]
    },
    onClick() {
      this.$emit('onChangeButtonClick', {buildingName : this.buildingName })
      this.buildingSelected=this.buildingName
      console.log(this.buildingSelected)
    }
  },
}

</script>

<style scoped>
.containerButton{
  color:inherit;
  background-color: inherit;
  border: none;
  margin: 10px
}

.containerButton:hover{
  cursor: pointer;
  transform: scale(1.1);
  transition: transform 330ms ease-in-out;
}

.containerButton:hover .imageBuilding{
  border: #ff7300 3px solid;
  padding: 2px;
  background-color: #ff7300;
  background-clip: content-box;
  filter: invert(100%);
}

.containerButton:hover .buildingNumber{
  border: #008CFF 3px solid;
  padding: 2px;
  background-color: white;
  color: #008CFF;
}

.imageBuilding{
  height: 80px;
  background-color: white;
  background-clip: content-box;
  padding: 2px;
  border: #008CFF 3px solid;
}
.buildingNumber{
  border: #008CFF 3px solid;
  background: #008CFF;
  border-radius: 50%;
  color: white;
  width: 30px;
  height: 30px;
  position: relative;
  left: 62px;
  top: -102px;
}

.number{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  width: fit-content;
  font-family: 'Slackey', cursive;
  font-size: 1.3em;
}
</style>