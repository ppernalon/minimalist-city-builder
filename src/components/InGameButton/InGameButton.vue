<template>
  <button class="containerButton"
          @click="onClick"
          :disabled='this.numberAvailable<1'
          :class="[ {'containerButtonSelected': this.isActive[this.buildingName] && this.numberAvailable>0} ]">
    <div class="containerImage">
      <img class="imageBuilding"
           :src="`icons/${getBuildingImageSource(this.buildingName)}`"
           alt="Building">
    </div>

    <div class="buildingNumber">
        <div class="number"> {{this.numberAvailable}} </div>
    </div>
  </button>
</template>

<script>
import mapConstants from "../Map/MapConstants";

const isActive = JSON.parse(JSON.stringify(mapConstants.SRC_BUILDINGS))

export default {
  name: "InGameButton.vue",
  props: {
    buildingName: String,
    numberAvailable : Int8Array,
  },
  data(){
    for (let building in isActive) {
      isActive[building]=false
    }
    return({
      buildingSelected: "",
      isActive
    })
  },
  methods:{
    getBuildingImageSource(buildingType) {
      return mapConstants.SRC_BUILDINGS[buildingType]
    },

    onClick() {
      for (let building in this.isActive) {
        this.isActive[building]=false
      }
      if(this.numberAvailable>=1){
        this.isActive[this.buildingName] = !this.isActive[this.buildingName]
      }
      this.$emit('onChangeButtonClick', {buildingName : this.buildingName })
      this.buildingSelected=this.buildingName
    }
  },
}

</script>

<style scoped>

  .containerButton{
    color:inherit;
    background-color: inherit;
    border: none;
    margin: 20px 10px 10px 10px;
    height: 70px;
  }

  .containerButton:hover{
    cursor: pointer;
    transform: scale(1.1);
    transition: transform 330ms ease-in-out;
  }

  .containerButton:hover .containerImage{
    border: #008CFF 3px solid;
    background-color: #008CFF;
    padding: 2px;
    background-clip: content-box;
  }

  .containerButton:hover .imageBuilding{
    background-clip: content-box;
    filter: brightness(0) invert(1);;
  }
  .containerButton:disabled{
    cursor: not-allowed;
  }
  .containerButton:hover .buildingNumber{
    border: #008CFF 3px solid;
    padding: 2px;
    background-color: white;
    color: #008CFF;
  }
  .containerButtonSelected .imageBuilding{
    background-clip: content-box;
    filter: brightness(0) invert(1);;
  }

  .containerButtonSelected .containerImage{
    border: #008CFF 3px solid;
    background-color: #008CFF;
    padding: 2px;
    background-clip: content-box;
  }

  .containerButtonSelected .buildingNumber{
    border: #008CFF 3px solid;
    padding: 2px;
    background-color: white;
    color: #008CFF;
  }

  .containerImage{
    padding: 2px;
    border: #008CFF 3px solid;
  }

  .imageBuilding{
    height: 60px;
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